import type {
  BookingId,
  BranchId,
  EntityTimestamps,
  Money,
  Page,
  PageRequest,
  RentalPointId,
  ReturnRequestId,
  StoreId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
  IsoUtcDateTime,
} from "../../shared/domain/index.js";
import type { Repository, SaveOptions } from "../../shared/domain/index.js";

export type ReturnRequestStatus =
  | "REQUESTED"
  | "VALIDATING_LOCATION"
  | "WAITING_FOR_STORE"
  | "STAFF_ASSIGNED"
  | "PICKUP_IN_PROGRESS"
  | "INSPECTION_PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "DISPUTED"
  | "CANCELLED";
export type ReturnType = "STORE" | "DEFINED_POINT" | "STAFF_PICKUP";
export type ReturnInspectionDecision =
  | "PASS"
  | "DAMAGE_CHARGE"
  | "MAINTENANCE"
  | "DISPUTE";

export interface ReturnLocation {
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracyMeters?: number | undefined;
}

export interface ReturnRequest
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: ReturnRequestId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly status: ReturnRequestStatus;
  readonly returnType: ReturnType;
  readonly returnPointId?: RentalPointId | undefined;
  readonly requestedAt: IsoUtcDateTime;
  readonly location: ReturnLocation;
  readonly evidenceImageRefs: readonly string[];
  readonly notes?: string | undefined;
  readonly damageCharge?: Money;
}

export interface ReturnInspection
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: string;
  readonly returnRequestId: ReturnRequestId;
  readonly bookingId: BookingId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly condition: string;
  readonly imageRefs: readonly string[];
  readonly equipmentComplete: boolean;
  readonly damageNotes?: string | undefined;
  readonly damageCharge?: Money | undefined;
  readonly inspectorUserId: UserId;
  readonly decision: ReturnInspectionDecision;
  readonly inspectedAt: IsoUtcDateTime;
}

export interface ReturnRequestSearchFilter {
  readonly tenantId: TenantId;
  readonly bookingId?: BookingId;
  readonly storeId?: StoreId;
  readonly status?: ReturnRequestStatus;
}

export interface ReturnRepository extends Repository<
  ReturnRequest,
  ReturnRequestId
> {
  findByBookingId(bookingId: BookingId): Promise<ReturnRequest | null>;
  findInspectionByReturnRequestId(
    returnRequestId: ReturnRequestId,
  ): Promise<ReturnInspection | null>;
  saveInspection(
    inspection: ReturnInspection,
    options?: SaveOptions,
  ): Promise<ReturnInspection>;
  search(
    filter: ReturnRequestSearchFilter,
    page: PageRequest,
  ): Promise<Page<ReturnRequest>>;
  save(request: ReturnRequest, options?: SaveOptions): Promise<ReturnRequest>;
}
