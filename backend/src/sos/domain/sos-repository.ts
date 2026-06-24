import type {
  AssetId,
  BookingId,
  BranchId,
  EntityTimestamps,
  IsoUtcDateTime,
  Page,
  PageRequest,
  RideSessionId,
  SaveOptions,
  SosCaseId,
  StoreId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
} from "../../shared/domain/index.js";
import type { Repository } from "../../shared/domain/index.js";

export type SosIssueType =
  | "BIKE_BROKEN"
  | "FLAT_TIRE"
  | "ACCIDENT"
  | "LOST"
  | "HEALTH"
  | "UNSAFE"
  | "OTHER";
export type SosCaseStatus =
  | "OPEN"
  | "ACKNOWLEDGED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";
export type SosTimelineEventType =
  | "OPENED"
  | "ACKNOWLEDGED"
  | "ESCALATED"
  | "ASSIGNED"
  | "STARTED"
  | "RESOLVED"
  | "CLOSED";

export interface SosLocation {
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracyMeters: number;
}

export interface SosTimelineEvent {
  readonly eventType: SosTimelineEventType;
  readonly occurredAt: IsoUtcDateTime;
  readonly actorUserId?: UserId | undefined;
  readonly notes?: string | undefined;
  readonly escalationLevel?: number | undefined;
}

export interface SosCase
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: SosCaseId;
  readonly userId: UserId;
  readonly bookingId: BookingId;
  readonly rideSessionId: RideSessionId;
  readonly assetId: AssetId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly phone: string;
  readonly latestLocation: SosLocation;
  readonly issueType: SosIssueType;
  readonly status: SosCaseStatus;
  readonly disclaimerText: string;
  readonly assignedStaffUserId?: UserId | undefined;
  readonly escalationLevel: number;
  readonly timeline: readonly SosTimelineEvent[];
}

export interface SosCaseSearchFilter {
  readonly tenantId?: TenantId | undefined;
  readonly branchId?: BranchId | undefined;
  readonly bookingId?: BookingId | undefined;
  readonly status?: SosCaseStatus | undefined;
}

export interface SosRepository extends Repository<SosCase, SosCaseId> {
  findActiveByBookingId(bookingId: BookingId): Promise<SosCase | null>;
  search(
    filter: SosCaseSearchFilter,
    page: PageRequest,
  ): Promise<Page<SosCase>>;
  save(caseRecord: SosCase, options?: SaveOptions): Promise<SosCase>;
}
