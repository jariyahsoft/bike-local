import type { AuditLogWriter } from "../../identity/application/security-pipeline.js";
import type { BookingService } from "../../booking/application/booking-service.js";
import type { Booking } from "../../booking/domain/booking-repository.js";
import type { InventoryService } from "../../inventory/application/inventory-service.js";
import type { AssetStatus } from "../../inventory/domain/inventory-repository.js";
import { transitionDeposit } from "../../payment/domain/payment-policies.js";
import type {
  DepositRepository,
  OutboxEvent,
  OutboxEventRepository,
} from "../../payment/domain/payment-repository.js";
import {
  DomainError,
  asEntityVersion,
  asMinorUnitAmount,
  type BookingId,
  type CorrelationId,
  type IsoUtcDateTime,
  type OutboxEventId,
  type ReturnRequestId,
  type RideSessionId,
  type UserId,
} from "../../shared/domain/index.js";
import {
  createReturnInspectionProfile,
  createReturnRequestProfile,
  closeReturnRequestAfterInspection,
} from "../../return/domain/return-policies.js";
import type {
  ReturnInspection,
  ReturnInspectionDecision,
  ReturnLocation,
  ReturnRepository,
  ReturnRequest,
  ReturnType,
} from "../../return/domain/return-repository.js";
import { createRideSessionProfile } from "../domain/ride-policies.js";
import type { RideRepository } from "../domain/ride-repository.js";

export interface BookingQrTokenVerifier {
  verify(input: {
    readonly bookingId: BookingId;
    readonly userId: UserId;
    readonly storeId: Booking["storeId"];
    readonly branchId: Booking["branchId"];
    readonly tokenReference: string;
    readonly presentedToken: string;
    readonly now: IsoUtcDateTime;
  }): Promise<void>;
}

export interface RentalLifecycleServiceDependencies {
  readonly bookingService: BookingService;
  readonly inventoryService: InventoryService;
  readonly rideRepository: RideRepository;
  readonly returnRepository: ReturnRepository;
  readonly depositRepository: DepositRepository;
  readonly outboxEventRepository: OutboxEventRepository;
  readonly qrTokenVerifier: BookingQrTokenVerifier;
  readonly auditLogWriter: AuditLogWriter;
}

export interface HandoverChecklistInput {
  readonly bookingId: BookingId;
  readonly rideSessionId: RideSessionId;
  readonly actorUserId: UserId;
  readonly staffUserId: UserId;
  readonly presentedQrToken: string;
  readonly checklistImageRefs: readonly string[];
  readonly conditionNotes: string;
  readonly equipmentConfirmed: boolean;
  readonly existingDamageNotes?: string | undefined;
  readonly expectedBookingVersion: Booking["version"];
  readonly outboxEventId: OutboxEventId;
  readonly correlationId: CorrelationId;
  readonly now: IsoUtcDateTime;
}

export class RentalLifecycleService {
  constructor(
    private readonly dependencies: RentalLifecycleServiceDependencies,
  ) {}

  async handover(input: HandoverChecklistInput): Promise<Booking> {
    const booking = await this.dependencies.bookingService.getBooking(
      input.bookingId,
    );
    if (booking.status !== "AWAITING_PICKUP") {
      throw new DomainError(
        "HANDOVER_BOOKING_STATE_INVALID",
        "Handover can start only from AWAITING_PICKUP.",
        {
          bookingId: booking.id,
          status: booking.status,
        },
      );
    }
    if (input.checklistImageRefs.length === 0 || !input.equipmentConfirmed) {
      throw new DomainError(
        "VALIDATION_INVALID",
        "Handover requires checklist photos and equipment confirmation.",
        {
          bookingId: booking.id,
        },
      );
    }

    try {
      await this.dependencies.qrTokenVerifier.verify({
        bookingId: booking.id,
        userId: booking.userId,
        storeId: booking.storeId,
        branchId: booking.branchId,
        tokenReference: booking.qrBookingTokenReference,
        presentedToken: input.presentedQrToken,
        now: input.now,
      });
    } catch (error) {
      throw new DomainError(
        "HANDOVER_QR_TOKEN_INVALID",
        "QR booking token is invalid, expired, or already used.",
        {
          bookingId: booking.id,
          cause: error instanceof Error ? error.message : "unknown",
        },
      );
    }

    if (booking.version !== input.expectedBookingVersion) {
      throw new DomainError("VERSION_CONFLICT", "Booking version conflict.", {
        bookingId: booking.id,
      });
    }
    const savedBooking =
      await this.dependencies.bookingService.transitionBooking({
        bookingId: booking.id,
        toStatus: "IN_PROGRESS",
        actorUserId: input.actorUserId,
        reason: "handover_completed",
        now: input.now,
      });

    for (const assetId of booking.assetIds) {
      await this.transitionAssetForHandover(assetId, input);
    }

    await this.dependencies.rideRepository.save(
      createRideSessionProfile({
        rideSessionId: input.rideSessionId,
        tenantId: booking.tenantId,
        bookingId: booking.id,
        userId: booking.userId,
        now: input.now,
      }),
    );

    const deposit = await this.dependencies.depositRepository.findByBookingId(
      booking.id,
    );
    if (deposit !== null && deposit.status === "PENDING") {
      await this.dependencies.depositRepository.save(
        transitionDeposit(deposit, "HELD", {
          now: input.now,
          bookingStatus: savedBooking.status,
        }),
        { expectedVersion: deposit.version },
      );
    }

    await this.dependencies.auditLogWriter.append({
      tenantId: booking.tenantId,
      action: "booking.state.changed",
      resourceType: "booking",
      resourceId: booking.id,
      actor: {
        actorType: "USER",
        actorUserId: input.actorUserId,
        roleNames: [],
      },
      before: { status: booking.status },
      after: {
        status: savedBooking.status,
        staff_user_id: input.staffUserId,
        checklist_image_count: input.checklistImageRefs.length,
        condition_notes: input.conditionNotes,
        existing_damage_notes: input.existingDamageNotes,
      },
      metadata: {
        correlationId: input.correlationId,
        occurredAt: input.now,
        immutable: true,
        classification: "INTERNAL",
      },
    });
    await this.dependencies.outboxEventRepository.save(
      this.buildOutboxEvent({
        id: input.outboxEventId,
        tenantId: booking.tenantId,
        type: "rental.started",
        aggregateType: "booking",
        aggregateId: booking.id,
        payload: {
          booking_id: booking.id,
          store_id: booking.storeId,
          branch_id: booking.branchId,
          asset_ids: booking.assetIds,
        },
        now: input.now,
      }),
    );

    return savedBooking;
  }

  async createReturnRequest(input: {
    readonly returnRequestId: ReturnRequestId;
    readonly bookingId: BookingId;
    readonly actorUserId: UserId;
    readonly returnType: ReturnType;
    readonly returnPointId?: ReturnRequest["returnPointId"];
    readonly evidenceImageRefs: readonly string[];
    readonly location: ReturnLocation;
    readonly notes?: string | undefined;
    readonly outboxEventId: OutboxEventId;
    readonly correlationId: CorrelationId;
    readonly now: IsoUtcDateTime;
  }): Promise<ReturnRequest> {
    const booking = await this.dependencies.bookingService.getBooking(
      input.bookingId,
    );
    if (booking.userId !== input.actorUserId) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Return request can be created only by the booking renter.",
        { bookingId: booking.id },
      );
    }

    const existing = await this.dependencies.returnRepository.findByBookingId(
      booking.id,
    );
    if (existing !== null) {
      return existing;
    }

    const request = createReturnRequestProfile({
      returnRequestId: input.returnRequestId,
      booking,
      returnType: input.returnType,
      returnPointId: input.returnPointId,
      evidenceImageRefs: input.evidenceImageRefs,
      location: input.location,
      notes: input.notes,
      now: input.now,
    });
    const updatedBooking =
      await this.dependencies.bookingService.transitionBooking({
        bookingId: booking.id,
        toStatus: "RETURN_PENDING",
        actorUserId: input.actorUserId,
        reason: "return_requested",
        now: input.now,
      });
    for (const assetId of booking.assetIds) {
      await this.dependencies.inventoryService.transitionAssetStatus({
        assetId,
        toStatus: "RETURN_PENDING",
        actorUserId: input.actorUserId,
        reason: "return_requested",
        now: input.now,
      });
    }
    const saved = await this.dependencies.returnRepository.save(request);
    await this.dependencies.outboxEventRepository.save(
      this.buildOutboxEvent({
        id: input.outboxEventId,
        tenantId: booking.tenantId,
        type: "return.requested",
        aggregateType: "return_request",
        aggregateId: saved.id,
        payload: {
          return_request_id: saved.id,
          booking_id: updatedBooking.id,
          store_id: saved.storeId,
          branch_id: saved.branchId,
          return_type: saved.returnType,
        },
        now: input.now,
      }),
    );

    return saved;
  }

  async inspectReturn(input: {
    readonly returnRequestId: ReturnRequestId;
    readonly inspectionId: string;
    readonly actorUserId: UserId;
    readonly condition: string;
    readonly imageRefs: readonly string[];
    readonly equipmentComplete: boolean;
    readonly damageNotes?: string | undefined;
    readonly damageChargeAmount?: number | undefined;
    readonly currency?: string | undefined;
    readonly decision: ReturnInspectionDecision;
    readonly correlationId: CorrelationId;
    readonly now: IsoUtcDateTime;
  }): Promise<ReturnRequest> {
    const request = await this.getReturnRequest(input.returnRequestId);
    const existingInspection =
      await this.dependencies.returnRepository.findInspectionByReturnRequestId(
        request.id,
      );
    if (existingInspection !== null) {
      throw new DomainError(
        "RETURN_INSPECTION_ALREADY_RECORDED",
        "Return inspection has already been recorded.",
        { returnRequestId: request.id },
      );
    }

    const booking = await this.dependencies.bookingService.getBooking(
      request.bookingId,
    );
    const inspection = createReturnInspectionProfile({
      inspectionId: input.inspectionId,
      request,
      condition: input.condition,
      imageRefs: input.imageRefs,
      equipmentComplete: input.equipmentComplete,
      damageNotes: input.damageNotes,
      damageChargeAmount: input.damageChargeAmount,
      currency: input.currency,
      inspectorUserId: input.actorUserId,
      decision: input.decision,
      inspectedAt: input.now,
    });

    await this.dependencies.bookingService.transitionBooking({
      bookingId: booking.id,
      toStatus: "INSPECTION_PENDING",
      actorUserId: input.actorUserId,
      reason: "inspection_started",
      now: input.now,
    });
    for (const assetId of booking.assetIds) {
      await this.dependencies.inventoryService.transitionAssetStatus({
        assetId,
        toStatus: "INSPECTION_PENDING",
        actorUserId: input.actorUserId,
        reason: "inspection_started",
        now: input.now,
      });
    }

    await this.dependencies.returnRepository.saveInspection(inspection);
    const closedRequest = await this.dependencies.returnRepository.save(
      closeReturnRequestAfterInspection(request, inspection),
      { expectedVersion: request.version },
    );
    await this.closeBookingAssetsAndDeposit(booking, inspection, input);

    await this.dependencies.auditLogWriter.append({
      tenantId: request.tenantId,
      action: "return.confirmed",
      resourceType: "return_request",
      resourceId: request.id,
      actor: {
        actorType: "USER",
        actorUserId: input.actorUserId,
        roleNames: [],
      },
      after: {
        booking_id: booking.id,
        decision: inspection.decision,
        equipment_complete: inspection.equipmentComplete,
        damage_charge_amount: inspection.damageCharge?.amount,
      },
      metadata: {
        correlationId: input.correlationId,
        occurredAt: input.now,
        immutable: true,
        classification: "INTERNAL",
      },
    });

    return closedRequest;
  }

  private async closeBookingAssetsAndDeposit(
    booking: Booking,
    inspection: ReturnInspection,
    input: {
      readonly actorUserId: UserId;
      readonly now: IsoUtcDateTime;
    },
  ): Promise<void> {
    if (inspection.decision === "DISPUTE") {
      await this.dependencies.bookingService.transitionBooking({
        bookingId: booking.id,
        toStatus: "DISPUTED",
        actorUserId: input.actorUserId,
        reason: "inspection_disputed",
        now: input.now,
      });
      return;
    }

    const targetAssetStatus: AssetStatus =
      inspection.decision === "PASS" ? "AVAILABLE" : "MAINTENANCE";
    for (const assetId of booking.assetIds) {
      await this.dependencies.inventoryService.transitionAssetStatus({
        assetId,
        toStatus: targetAssetStatus,
        actorUserId: input.actorUserId,
        reason: `inspection_${inspection.decision.toLowerCase()}`,
        now: input.now,
      });
    }
    await this.dependencies.bookingService.transitionBooking({
      bookingId: booking.id,
      toStatus: "COMPLETED",
      actorUserId: input.actorUserId,
      reason: `inspection_${inspection.decision.toLowerCase()}`,
      now: input.now,
    });

    const deposit = await this.dependencies.depositRepository.findByBookingId(
      booking.id,
    );
    if (deposit === null || deposit.status === "NOT_REQUIRED") {
      return;
    }
    if (inspection.decision === "PASS") {
      await this.dependencies.depositRepository.save(
        transitionDeposit(deposit, "RELEASED", {
          now: input.now,
          bookingStatus: "COMPLETED",
        }),
        { expectedVersion: deposit.version },
      );
      return;
    }

    const deductedAmount =
      inspection.damageCharge?.amount ?? asMinorUnitAmount(0);
    await this.dependencies.depositRepository.save(
      {
        ...deposit,
        status: "PARTIALLY_DEDUCTED",
        deductedAmount: {
          amount: deductedAmount,
          currency:
            inspection.damageCharge?.currency ?? deposit.amount.currency,
        },
        updatedAt: input.now,
        version: asEntityVersion((deposit.version as number) + 1),
      },
      { expectedVersion: deposit.version },
    );
  }

  private async transitionAssetForHandover(
    assetId: Booking["assetIds"][number],
    input: {
      readonly actorUserId: UserId;
      readonly now: IsoUtcDateTime;
    },
  ): Promise<void> {
    const asset = await this.dependencies.inventoryService.getAsset(assetId);
    const pathByStatus: Partial<Record<AssetStatus, readonly AssetStatus[]>> = {
      AVAILABLE: ["RESERVED", "AWAITING_HANDOVER", "RENTED"],
      RESERVED: ["AWAITING_HANDOVER", "RENTED"],
      PREPARING: ["AWAITING_HANDOVER", "RENTED"],
      AWAITING_HANDOVER: ["RENTED"],
    };
    const path = pathByStatus[asset.status];
    if (path === undefined) {
      throw new DomainError(
        "ASSET_STATUS_TRANSITION_INVALID",
        "Asset cannot be handed over from its current state.",
        { assetId, status: asset.status },
      );
    }

    for (const toStatus of path) {
      await this.dependencies.inventoryService.transitionAssetStatus({
        assetId,
        toStatus,
        actorUserId: input.actorUserId,
        reason: "handover_completed",
        now: input.now,
      });
    }
  }

  async getReturnRequest(
    returnRequestId: ReturnRequestId,
  ): Promise<ReturnRequest> {
    const request =
      await this.dependencies.returnRepository.findById(returnRequestId);
    if (request === null) {
      throw new DomainError("NOT_FOUND", "Return request not found.", {
        returnRequestId,
      });
    }

    return request;
  }

  private buildOutboxEvent(input: {
    readonly id: OutboxEventId;
    readonly tenantId: Booking["tenantId"];
    readonly type: string;
    readonly aggregateType: string;
    readonly aggregateId: string;
    readonly payload: Readonly<Record<string, unknown>>;
    readonly now: IsoUtcDateTime;
  }): OutboxEvent {
    return {
      id: input.id,
      tenantId: input.tenantId,
      type: input.type,
      aggregateType: input.aggregateType,
      aggregateId: input.aggregateId,
      payload: input.payload,
      occurredAt: input.now,
      createdAt: input.now,
      updatedAt: input.now,
      version: asEntityVersion(1),
    };
  }
}

export interface SerializedReturnRequest {
  readonly id: ReturnRequestId;
  readonly tenant_id: ReturnRequest["tenantId"];
  readonly booking_id: BookingId;
  readonly user_id: UserId;
  readonly store_id: ReturnRequest["storeId"];
  readonly branch_id: ReturnRequest["branchId"];
  readonly status: ReturnRequest["status"];
  readonly return_type: ReturnRequest["returnType"];
  readonly return_point_id?: ReturnRequest["returnPointId"];
  readonly requested_at: IsoUtcDateTime;
  readonly location: {
    readonly latitude: number;
    readonly longitude: number;
    readonly accuracy_meters?: number | undefined;
  };
  readonly evidence_image_refs: readonly string[];
  readonly notes?: string | undefined;
  readonly damage_charge_amount?: number | undefined;
  readonly currency?: string | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: ReturnRequest["version"];
}

export const serializeReturnRequest = (
  request: ReturnRequest,
): SerializedReturnRequest => ({
  id: request.id,
  tenant_id: request.tenantId,
  booking_id: request.bookingId,
  user_id: request.userId,
  store_id: request.storeId,
  branch_id: request.branchId,
  status: request.status,
  return_type: request.returnType,
  return_point_id: request.returnPointId,
  requested_at: request.requestedAt,
  location: {
    latitude: request.location.latitude,
    longitude: request.location.longitude,
    accuracy_meters: request.location.accuracyMeters,
  },
  evidence_image_refs: request.evidenceImageRefs,
  notes: request.notes,
  damage_charge_amount: request.damageCharge?.amount as number | undefined,
  currency: request.damageCharge?.currency,
  created_at: request.createdAt,
  updated_at: request.updatedAt,
  version: request.version,
});
