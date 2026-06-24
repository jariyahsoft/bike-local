import { DomainError } from "../../shared/domain/domain-error.js";
import {
  asEntityVersion,
  type BookingId,
  type BranchId,
  type ContentReportId,
  type ContentSubmissionId,
  type IsoUtcDateTime,
  type PlaceId,
  type RouteId,
  type ReviewId,
  type StoreId,
  type TenantId,
  type UserId,
} from "../../shared/domain/index.js";
import type { Location } from "../../shared/domain/location.js";
import type {
  ContentApprovalStatus,
  ContentReport,
  ContentSubmission,
  Place,
  Review,
  Route,
} from "./content-repository.js";

const assertLocation = (location: Location, field: string): void => {
  if (
    location.accuracyMeters <= 0 ||
    location.latitude < -90 ||
    location.latitude > 90 ||
    location.longitude < -180 ||
    location.longitude > 180
  ) {
    throw new DomainError("VALIDATION_INVALID", `${field} is invalid.`, {
      field,
    });
  }
};

export const createRouteProfile = (input: {
  readonly routeId: RouteId;
  readonly tenantId: TenantId;
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
  readonly suitableBikeTypes?: readonly string[] | undefined;
  readonly status: ContentApprovalStatus;
  readonly now: IsoUtcDateTime;
}): Route => {
  assertLocation(input.startLocation, "start_location");
  assertLocation(input.endLocation, "end_location");

  return {
    id: input.routeId,
    tenantId: input.tenantId,
    submittedByUserId: input.submittedByUserId,
    storeId: input.storeId,
    branchId: input.branchId,
    name: input.name,
    description: input.description,
    startLocation: input.startLocation,
    endLocation: input.endLocation,
    distanceMeters: input.distanceMeters,
    difficulty: input.difficulty,
    surface: input.surface,
    warning: input.warning,
    suitableBikeTypes: input.suitableBikeTypes ?? [],
    status: input.status,
    createdAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion(1),
  };
};

export const createPlaceProfile = (input: {
  readonly placeId: PlaceId;
  readonly tenantId: TenantId;
  readonly submittedByUserId: UserId;
  readonly storeId?: StoreId | undefined;
  readonly branchId?: BranchId | undefined;
  readonly name: string;
  readonly placeType: Place["placeType"];
  readonly location: Location;
  readonly status: ContentApprovalStatus;
  readonly now: IsoUtcDateTime;
}): Place => {
  assertLocation(input.location, "location");

  return {
    id: input.placeId,
    tenantId: input.tenantId,
    submittedByUserId: input.submittedByUserId,
    storeId: input.storeId,
    branchId: input.branchId,
    name: input.name,
    placeType: input.placeType,
    location: input.location,
    status: input.status,
    createdAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion(1),
  };
};

export const createReviewProfile = (input: {
  readonly reviewId: ReviewId;
  readonly tenantId: TenantId;
  readonly bookingId: BookingId;
  readonly userId: UserId;
  readonly storeId: StoreId;
  readonly branchId: BranchId;
  readonly rating: number;
  readonly body: string;
  readonly now: IsoUtcDateTime;
}): Review => {
  if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
    throw new DomainError(
      "VALIDATION_INVALID",
      "Review rating must be 1 to 5.",
      {},
    );
  }

  return {
    id: input.reviewId,
    tenantId: input.tenantId,
    bookingId: input.bookingId,
    userId: input.userId,
    storeId: input.storeId,
    branchId: input.branchId,
    rating: input.rating,
    body: input.body,
    status: "APPROVED",
    createdAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion(1),
  };
};

export const createContentSubmissionProfile = (input: {
  readonly contentSubmissionId: ContentSubmissionId;
  readonly tenantId: TenantId;
  readonly contentType: ContentSubmission["contentType"];
  readonly contentId: string;
  readonly submittedByUserId: UserId;
  readonly status: ContentApprovalStatus;
  readonly now: IsoUtcDateTime;
}): ContentSubmission => ({
  id: input.contentSubmissionId,
  tenantId: input.tenantId,
  contentType: input.contentType,
  contentId: input.contentId,
  submittedByUserId: input.submittedByUserId,
  status: input.status,
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});

export const moderateContentSubmission = (
  submission: ContentSubmission,
  input: {
    readonly status: Extract<
      ContentApprovalStatus,
      "APPROVED" | "REJECTED" | "SUSPENDED" | "OUTDATED"
    >;
    readonly moderatedByUserId: UserId;
    readonly moderationReason: string;
    readonly now: IsoUtcDateTime;
  },
): ContentSubmission => {
  if (submission.status === "APPROVED" && input.status === "APPROVED") {
    return submission;
  }
  if (input.moderationReason.trim() === "") {
    throw new DomainError(
      "CONTENT_APPROVAL_STATE_INVALID",
      "Moderation reason is required.",
      {},
    );
  }

  return {
    ...submission,
    status: input.status,
    moderationReason: input.moderationReason,
    moderatedByUserId: input.moderatedByUserId,
    moderatedAt: input.now,
    updatedAt: input.now,
    version: asEntityVersion((submission.version as number) + 1),
  };
};

export const updateContentEntityStatus = <
  T extends {
    readonly status: ContentApprovalStatus;
    readonly updatedAt: IsoUtcDateTime;
    readonly version: unknown;
  },
>(
  entity: T,
  status: ContentApprovalStatus,
  now: IsoUtcDateTime,
  extra?: Readonly<Record<string, unknown>>,
): T =>
  ({
    ...entity,
    status,
    ...extra,
    updatedAt: now,
    version: asEntityVersion(((entity.version as number) + 1) as number),
  }) as T;

export const createContentReportProfile = (input: {
  readonly contentReportId: ContentReportId;
  readonly tenantId: TenantId;
  readonly contentType: ContentReport["contentType"];
  readonly contentId: string;
  readonly reportedByUserId: UserId;
  readonly reason: ContentReport["reason"];
  readonly notes?: string | undefined;
  readonly now: IsoUtcDateTime;
}): ContentReport => ({
  id: input.contentReportId,
  tenantId: input.tenantId,
  contentType: input.contentType,
  contentId: input.contentId,
  reportedByUserId: input.reportedByUserId,
  reason: input.reason,
  notes: input.notes,
  createdAt: input.now,
  updatedAt: input.now,
  version: asEntityVersion(1),
});
