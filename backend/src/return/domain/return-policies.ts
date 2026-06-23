import { DomainError } from "../../shared/domain/domain-error.js";
import {
  asEntityVersion,
  asMinorUnitAmount,
  type IsoUtcDateTime,
  type ReturnRequestId,
  type UserId,
} from "../../shared/domain/index.js";
import type { Booking } from "../../booking/domain/booking-repository.js";
import type {
  ReturnInspection,
  ReturnInspectionDecision,
  ReturnLocation,
  ReturnRequest,
  ReturnType,
} from "./return-repository.js";

export const assertReturnEvidenceValid = (input: {
  readonly returnType: ReturnType;
  readonly evidenceImageRefs: readonly string[];
  readonly location: ReturnLocation;
}): void => {
  if (input.returnType === ("SMART_DOCK" as ReturnType)) {
    throw new DomainError(
      "RETURN_TYPE_UNSUPPORTED",
      "Smart Dock returns are a Phase 2 placeholder and are not accepted for MVP.",
      { returnType: input.returnType },
    );
  }
  if (input.evidenceImageRefs.length === 0) {
    throw new DomainError(
      "RETURN_EVIDENCE_REQUIRED",
      "Return request requires bike and parking evidence photos.",
      {},
    );
  }
  if (
    input.location.latitude < -90 ||
    input.location.latitude > 90 ||
    input.location.longitude < -180 ||
    input.location.longitude > 180
  ) {
    throw new DomainError(
      "RETURN_LOCATION_INVALID",
      "Return location coordinates are outside valid ranges.",
      { location: input.location },
    );
  }
};

export const createReturnRequestProfile = (input: {
  readonly returnRequestId: ReturnRequestId;
  readonly booking: Booking;
  readonly returnType: ReturnType;
  readonly returnPointId?: ReturnRequest["returnPointId"];
  readonly evidenceImageRefs: readonly string[];
  readonly location: ReturnLocation;
  readonly notes?: string | undefined;
  readonly now: IsoUtcDateTime;
}): ReturnRequest => {
  assertReturnEvidenceValid(input);
  if (input.booking.status !== "IN_PROGRESS") {
    throw new DomainError(
      "RETURN_BOOKING_STATE_INVALID",
      "Return can be requested only while rental is in progress.",
      {
        bookingId: input.booking.id,
        status: input.booking.status,
      },
    );
  }

  return {
    id: input.returnRequestId,
    tenantId: input.booking.tenantId,
    bookingId: input.booking.id,
    userId: input.booking.userId,
    storeId: input.booking.storeId,
    branchId: input.booking.branchId,
    status: "WAITING_FOR_STORE",
    returnType: input.returnType,
    returnPointId: input.returnPointId,
    requestedAt: input.now,
    location: input.location,
    evidenceImageRefs: input.evidenceImageRefs,
    notes: input.notes,
    createdAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion(1),
  };
};

export const createReturnInspectionProfile = (input: {
  readonly inspectionId: string;
  readonly request: ReturnRequest;
  readonly condition: string;
  readonly imageRefs: readonly string[];
  readonly equipmentComplete: boolean;
  readonly damageNotes?: string | undefined;
  readonly damageChargeAmount?: number | undefined;
  readonly currency?: string | undefined;
  readonly inspectorUserId: UserId;
  readonly decision: ReturnInspectionDecision;
  readonly inspectedAt: IsoUtcDateTime;
}): ReturnInspection => {
  if (input.imageRefs.length === 0) {
    throw new DomainError(
      "RETURN_INSPECTION_PHOTO_REQUIRED",
      "Return inspection requires condition photos.",
      {},
    );
  }
  if (input.condition.trim() === "") {
    throw new DomainError(
      "RETURN_INSPECTION_CONDITION_REQUIRED",
      "Return inspection condition is required.",
      {},
    );
  }
  if (input.damageChargeAmount !== undefined && input.currency === undefined) {
    throw new DomainError(
      "RETURN_DAMAGE_CHARGE_CURRENCY_REQUIRED",
      "Damage charge currency is required when a charge is recorded.",
      {},
    );
  }

  return {
    id: input.inspectionId,
    tenantId: input.request.tenantId,
    returnRequestId: input.request.id,
    bookingId: input.request.bookingId,
    storeId: input.request.storeId,
    branchId: input.request.branchId,
    condition: input.condition.trim(),
    imageRefs: input.imageRefs,
    equipmentComplete: input.equipmentComplete,
    damageNotes: input.damageNotes,
    damageCharge:
      input.damageChargeAmount === undefined || input.currency === undefined
        ? undefined
        : {
            amount: asMinorUnitAmount(input.damageChargeAmount),
            currency: input.currency,
          },
    inspectorUserId: input.inspectorUserId,
    decision: input.decision,
    inspectedAt: input.inspectedAt,
    createdAt: input.inspectedAt,
    updatedAt: input.inspectedAt,
    version: asEntityVersion(1),
  };
};

export const closeReturnRequestAfterInspection = (
  request: ReturnRequest,
  inspection: ReturnInspection,
): ReturnRequest => {
  const closed: ReturnRequest = {
    ...request,
    status:
      inspection.decision === "DISPUTE"
        ? "DISPUTED"
        : inspection.decision === "PASS" ||
            inspection.decision === "DAMAGE_CHARGE" ||
            inspection.decision === "MAINTENANCE"
          ? "ACCEPTED"
          : "REJECTED",
    updatedAt: inspection.inspectedAt,
    version: asEntityVersion((request.version as number) + 1),
  };

  return inspection.damageCharge === undefined
    ? closed
    : { ...closed, damageCharge: inspection.damageCharge };
};
