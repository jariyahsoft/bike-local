import type {
  BookingId,
  BranchId,
  ContentReportId,
  ContentSubmissionId,
  EntityTimestamps,
  IsoUtcDateTime,
  Page,
  PageRequest,
  PlaceId,
  ReviewId,
  RouteId,
  SaveOptions,
  StoreId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
} from "../../shared/domain/index.js";
import type { Repository } from "../../shared/domain/index.js";
import type { Location } from "../../shared/domain/location.js";

export type ContentApprovalStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REVISION_REQUIRED"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED"
  | "OUTDATED";
export type ContentType = "ROUTE" | "PLACE" | "REVIEW";
export type PlaceType =
  | "CHECK_IN"
  | "VIEWPOINT"
  | "CAFE"
  | "RESTAURANT"
  | "REPAIR_POINT"
  | "WATER_POINT"
  | "TOILET"
  | "HAZARD"
  | "TOURIST_ATTRACTION";
export type ContentReportReason =
  | "UNSAFE"
  | "WRONG"
  | "OUTDATED"
  | "ABUSE"
  | "OTHER";

export interface Route
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: RouteId;
  readonly submittedByUserId: UserId;
  readonly storeId?: StoreId | undefined;
  readonly branchId?: BranchId | undefined;
  readonly name: string;
  readonly description: string;
  readonly startLocation: Location;
  readonly endLocation: Location;
  readonly distanceMeters: number;
  readonly difficulty: string;
  readonly surface?: string | undefined;
  readonly warning?: string | undefined;
  readonly suitableBikeTypes: readonly string[];
  readonly status: ContentApprovalStatus;
}

export interface Place
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: PlaceId;
  readonly submittedByUserId: UserId;
  readonly storeId?: StoreId | undefined;
  readonly branchId?: BranchId | undefined;
  readonly name: string;
  readonly placeType: PlaceType;
  readonly location: Location;
  readonly status: ContentApprovalStatus;
}

export interface Review
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: ReviewId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly rating: number;
  readonly body: string;
  readonly status: ContentApprovalStatus;
  readonly hiddenReason?: string | undefined;
}

export interface ContentSubmission
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: ContentSubmissionId;
  readonly contentType: ContentType;
  readonly contentId: string;
  readonly submittedByUserId: UserId;
  readonly status: ContentApprovalStatus;
  readonly moderationReason?: string | undefined;
  readonly moderatedByUserId?: UserId | undefined;
  readonly moderatedAt?: IsoUtcDateTime | undefined;
}

export interface ContentReport
  extends TenantScopedEntity, VersionedEntity, EntityTimestamps {
  readonly id: ContentReportId;
  readonly contentType: ContentType;
  readonly contentId: string;
  readonly reportedByUserId: UserId;
  readonly reason: ContentReportReason;
  readonly notes?: string | undefined;
}

export interface ContentSubmissionSearchFilter {
  readonly tenantId: TenantId;
  readonly status?: ContentApprovalStatus | undefined;
  readonly contentType?: ContentType | undefined;
}

export interface ReviewSearchFilter {
  readonly tenantId: TenantId;
  readonly storeId?: StoreId | undefined;
  readonly bookingId?: BookingId | undefined;
}

export interface RouteRepository extends Repository<Route, RouteId> {
  save(route: Route, options?: SaveOptions): Promise<Route>;
}

export interface PlaceRepository extends Repository<Place, PlaceId> {
  save(place: Place, options?: SaveOptions): Promise<Place>;
}

export interface ReviewRepository extends Repository<Review, ReviewId> {
  findByBookingAndUser(
    bookingId: BookingId,
    userId: UserId,
  ): Promise<Review | null>;
  search(filter: ReviewSearchFilter, page: PageRequest): Promise<Page<Review>>;
  save(review: Review, options?: SaveOptions): Promise<Review>;
}

export interface ContentSubmissionRepository extends Repository<
  ContentSubmission,
  ContentSubmissionId
> {
  findByContent(
    contentType: ContentType,
    contentId: string,
  ): Promise<ContentSubmission | null>;
  search(
    filter: ContentSubmissionSearchFilter,
    page: PageRequest,
  ): Promise<Page<ContentSubmission>>;
  save(
    submission: ContentSubmission,
    options?: SaveOptions,
  ): Promise<ContentSubmission>;
}

export interface ContentReportRepository extends Repository<
  ContentReport,
  ContentReportId
> {
  save(report: ContentReport, options?: SaveOptions): Promise<ContentReport>;
}
