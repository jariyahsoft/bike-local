import type { AuditLogWriter } from "../../identity/application/security-pipeline.js";
import {
  DomainError,
  type BookingId,
  type BranchId,
  type ContentReportId,
  type ContentSubmissionId,
  type IsoUtcDateTime,
  type PlaceId,
  type ReviewId,
  type RouteId,
  type StoreId,
  type UserId,
} from "../../shared/domain/index.js";
import type { Location } from "../../shared/domain/location.js";
import type { BookingService } from "../../booking/application/booking-service.js";
import type {
  BranchRepository,
  StoreMemberRepository,
  StoreRepository,
} from "../../stores/domain/store-repository.js";
import {
  createContentReportProfile,
  createContentSubmissionProfile,
  createPlaceProfile,
  createReviewProfile,
  createRouteProfile,
  moderateContentSubmission,
  updateContentEntityStatus,
} from "../domain/content-policies.js";
import type {
  ContentApprovalStatus,
  ContentReportRepository,
  ContentSubmissionRepository,
  PlaceRepository,
  ReviewRepository,
  RouteRepository,
} from "../domain/content-repository.js";
import type { RoleAssignment } from "../../identity/domain/rbac.js";

const actorCanSubmitContent = (
  assignments: readonly RoleAssignment[],
  storeId: StoreId,
): boolean =>
  assignments.some(
    (assignment) =>
      assignment.role.startsWith("PLATFORM_") || assignment.storeId === storeId,
  );

const actorCanAutoApprove = (assignments: readonly RoleAssignment[]): boolean =>
  assignments.some(
    (assignment) =>
      assignment.role === "PLATFORM_ADMIN" ||
      assignment.role === "PLATFORM_MODERATOR",
  );

export interface ContentServiceDependencies {
  readonly bookingService: BookingService;
  readonly storeRepository: StoreRepository;
  readonly branchRepository: BranchRepository;
  readonly storeMemberRepository: StoreMemberRepository;
  readonly routeRepository: RouteRepository;
  readonly placeRepository: PlaceRepository;
  readonly reviewRepository: ReviewRepository;
  readonly contentSubmissionRepository: ContentSubmissionRepository;
  readonly contentReportRepository: ContentReportRepository;
  readonly auditLogWriter: AuditLogWriter;
}

export class ContentService {
  constructor(private readonly dependencies: ContentServiceDependencies) {}

  async submitRoute(input: {
    readonly routeId: RouteId;
    readonly contentSubmissionId: ContentSubmissionId;
    readonly actorUserId: UserId;
    readonly assignments: readonly RoleAssignment[];
    readonly storeId: StoreId;
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
    readonly now: IsoUtcDateTime;
  }) {
    const store = await this.getStore(input.storeId);
    await this.assertBranchStoreScope(input.storeId, input.branchId);
    if (!actorCanSubmitContent(input.assignments, store.id)) {
      throw new DomainError(
        "CONTENT_SUBMITTER_ROLE_REQUIRED",
        "Route submission requires a store member or platform role.",
        { storeId: store.id },
      );
    }
    const status: ContentApprovalStatus = actorCanAutoApprove(input.assignments)
      ? "APPROVED"
      : "SUBMITTED";
    const route = createRouteProfile({
      routeId: input.routeId,
      tenantId: store.tenantId,
      submittedByUserId: input.actorUserId,
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
      suitableBikeTypes: input.suitableBikeTypes,
      status,
      now: input.now,
    });
    const submission = createContentSubmissionProfile({
      contentSubmissionId: input.contentSubmissionId,
      tenantId: store.tenantId,
      contentType: "ROUTE",
      contentId: route.id,
      submittedByUserId: input.actorUserId,
      status,
      now: input.now,
    });

    await this.dependencies.routeRepository.save(route);
    await this.dependencies.contentSubmissionRepository.save(submission);

    return route;
  }

  async submitPlace(input: {
    readonly placeId: PlaceId;
    readonly contentSubmissionId: ContentSubmissionId;
    readonly actorUserId: UserId;
    readonly assignments: readonly RoleAssignment[];
    readonly storeId: StoreId;
    readonly branchId?: BranchId | undefined;
    readonly name: string;
    readonly placeType: string;
    readonly location: Location;
    readonly now: IsoUtcDateTime;
  }) {
    const store = await this.getStore(input.storeId);
    await this.assertBranchStoreScope(input.storeId, input.branchId);
    if (!actorCanSubmitContent(input.assignments, store.id)) {
      throw new DomainError(
        "CONTENT_SUBMITTER_ROLE_REQUIRED",
        "Place submission requires a store member or platform role.",
        { storeId: store.id },
      );
    }
    const status: ContentApprovalStatus = actorCanAutoApprove(input.assignments)
      ? "APPROVED"
      : "SUBMITTED";
    const place = createPlaceProfile({
      placeId: input.placeId,
      tenantId: store.tenantId,
      submittedByUserId: input.actorUserId,
      storeId: input.storeId,
      branchId: input.branchId,
      name: input.name,
      placeType: input.placeType as never,
      location: input.location,
      status,
      now: input.now,
    });
    const submission = createContentSubmissionProfile({
      contentSubmissionId: input.contentSubmissionId,
      tenantId: store.tenantId,
      contentType: "PLACE",
      contentId: place.id,
      submittedByUserId: input.actorUserId,
      status,
      now: input.now,
    });
    await this.dependencies.placeRepository.save(place);
    await this.dependencies.contentSubmissionRepository.save(submission);

    return place;
  }

  async approveSubmission(input: {
    readonly contentSubmissionId: ContentSubmissionId;
    readonly actorUserId: UserId;
    readonly reason: string;
    readonly now: IsoUtcDateTime;
  }) {
    const submission = await this.getSubmission(input.contentSubmissionId);
    const updatedSubmission = moderateContentSubmission(submission, {
      status: "APPROVED",
      moderatedByUserId: input.actorUserId,
      moderationReason: input.reason,
      now: input.now,
    });
    await this.dependencies.contentSubmissionRepository.save(
      updatedSubmission,
      {
        expectedVersion: submission.version,
      },
    );
    await this.updateContentStatus(
      updatedSubmission.contentType,
      updatedSubmission.contentId,
      "APPROVED",
      input.now,
    );
    await this.dependencies.auditLogWriter.append({
      tenantId: submission.tenantId,
      action: "content.approved",
      resourceType: "content_submission",
      resourceId: submission.id,
      actor: {
        actorType: "USER",
        actorUserId: input.actorUserId,
        roleNames: [],
      },
      reason: input.reason,
      after: { status: "APPROVED" },
      metadata: {
        correlationId: "content-approve" as never,
        occurredAt: input.now,
        immutable: true,
        classification: "CONFIDENTIAL",
      },
    });

    return updatedSubmission;
  }

  async rejectSubmission(input: {
    readonly contentSubmissionId: ContentSubmissionId;
    readonly actorUserId: UserId;
    readonly reason: string;
    readonly now: IsoUtcDateTime;
  }) {
    const submission = await this.getSubmission(input.contentSubmissionId);
    const updatedSubmission = moderateContentSubmission(submission, {
      status: "REJECTED",
      moderatedByUserId: input.actorUserId,
      moderationReason: input.reason,
      now: input.now,
    });
    await this.dependencies.contentSubmissionRepository.save(
      updatedSubmission,
      {
        expectedVersion: submission.version,
      },
    );
    await this.updateContentStatus(
      updatedSubmission.contentType,
      updatedSubmission.contentId,
      "REJECTED",
      input.now,
    );
    await this.dependencies.auditLogWriter.append({
      tenantId: submission.tenantId,
      action: "content.rejected",
      resourceType: "content_submission",
      resourceId: submission.id,
      actor: {
        actorType: "USER",
        actorUserId: input.actorUserId,
        roleNames: [],
      },
      reason: input.reason,
      after: { status: "REJECTED" },
      metadata: {
        correlationId: "content-reject" as never,
        occurredAt: input.now,
        immutable: true,
        classification: "CONFIDENTIAL",
      },
    });

    return updatedSubmission;
  }

  async createReview(input: {
    readonly reviewId: ReviewId;
    readonly contentSubmissionId: ContentSubmissionId;
    readonly bookingId: BookingId;
    readonly actorUserId: UserId;
    readonly rating: number;
    readonly body: string;
    readonly now: IsoUtcDateTime;
  }) {
    const booking = await this.dependencies.bookingService.getBooking(
      input.bookingId,
    );
    if (
      booking.userId !== input.actorUserId ||
      booking.status !== "COMPLETED"
    ) {
      throw new DomainError(
        "REVIEW_BOOKING_NOT_COMPLETED",
        "Review creation requires the actor's completed booking.",
        { bookingId: booking.id, status: booking.status },
      );
    }
    const existing =
      await this.dependencies.reviewRepository.findByBookingAndUser(
        booking.id,
        input.actorUserId,
      );
    if (existing !== null) {
      return existing;
    }
    const review = createReviewProfile({
      reviewId: input.reviewId,
      tenantId: booking.tenantId,
      bookingId: booking.id,
      userId: input.actorUserId,
      storeId: booking.storeId,
      branchId: booking.branchId,
      rating: input.rating,
      body: input.body,
      now: input.now,
    });
    const submission = createContentSubmissionProfile({
      contentSubmissionId: input.contentSubmissionId,
      tenantId: booking.tenantId,
      contentType: "REVIEW",
      contentId: review.id,
      submittedByUserId: input.actorUserId,
      status: "APPROVED",
      now: input.now,
    });
    await this.dependencies.reviewRepository.save(review);
    await this.dependencies.contentSubmissionRepository.save(submission);
    return review;
  }

  async reportContent(input: {
    readonly contentReportId: ContentReportId;
    readonly actorUserId: UserId;
    readonly contentType: "ROUTE" | "PLACE" | "REVIEW";
    readonly contentId: string;
    readonly reason: "UNSAFE" | "WRONG" | "OUTDATED" | "ABUSE" | "OTHER";
    readonly notes?: string | undefined;
    readonly now: IsoUtcDateTime;
  }) {
    const tenantId = await this.resolveContentTenantId(
      input.contentType,
      input.contentId,
    );
    const report = createContentReportProfile({
      contentReportId: input.contentReportId,
      tenantId,
      contentType: input.contentType,
      contentId: input.contentId,
      reportedByUserId: input.actorUserId,
      reason: input.reason,
      notes: input.notes,
      now: input.now,
    });
    await this.dependencies.contentReportRepository.save(report);
    await this.dependencies.auditLogWriter.append({
      tenantId,
      action: "content.reported",
      resourceType: "content_report",
      resourceId: report.id,
      actor: {
        actorType: "USER",
        actorUserId: input.actorUserId,
        roleNames: [],
      },
      after: {
        content_type: report.contentType,
        content_id: report.contentId,
        reason: report.reason,
      },
      metadata: {
        correlationId: "content-report" as never,
        occurredAt: input.now,
        immutable: true,
        classification: "CONFIDENTIAL",
      },
    });
    return report;
  }

  async hideReview(input: {
    readonly reviewId: ReviewId;
    readonly actorUserId: UserId;
    readonly reason: string;
    readonly now: IsoUtcDateTime;
  }) {
    if (input.reason.trim() === "") {
      throw new DomainError(
        "REVIEW_HIDE_REASON_REQUIRED",
        "Review hide reason is required.",
        {},
      );
    }
    const review = await this.getReview(input.reviewId);
    const updated = updateContentEntityStatus(review, "SUSPENDED", input.now, {
      hiddenReason: input.reason,
    });
    await this.dependencies.reviewRepository.save(updated, {
      expectedVersion: review.version,
    });
    const submission =
      await this.dependencies.contentSubmissionRepository.findByContent(
        "REVIEW",
        review.id,
      );
    if (submission !== null) {
      await this.dependencies.contentSubmissionRepository.save(
        moderateContentSubmission(submission, {
          status: "SUSPENDED",
          moderatedByUserId: input.actorUserId,
          moderationReason: input.reason,
          now: input.now,
        }),
        { expectedVersion: submission.version },
      );
    }
    await this.dependencies.auditLogWriter.append({
      tenantId: review.tenantId,
      action: "review.hidden",
      resourceType: "review",
      resourceId: review.id,
      actor: {
        actorType: "USER",
        actorUserId: input.actorUserId,
        roleNames: [],
      },
      reason: input.reason,
      after: { status: "SUSPENDED" },
      metadata: {
        correlationId: "review-hide" as never,
        occurredAt: input.now,
        immutable: true,
        classification: "CONFIDENTIAL",
      },
    });
    return updated;
  }

  async getSubmission(contentSubmissionId: ContentSubmissionId) {
    const submission =
      await this.dependencies.contentSubmissionRepository.findById(
        contentSubmissionId,
      );
    if (submission === null) {
      throw new DomainError("NOT_FOUND", "Content submission not found.", {
        contentSubmissionId,
      });
    }
    return submission;
  }

  private async resolveContentTenantId(
    contentType: "ROUTE" | "PLACE" | "REVIEW",
    contentId: string,
  ) {
    if (contentType === "ROUTE") {
      const route = await this.dependencies.routeRepository.findById(
        contentId as never,
      );
      if (route !== null) {
        return route.tenantId;
      }
    }
    if (contentType === "PLACE") {
      const place = await this.dependencies.placeRepository.findById(
        contentId as never,
      );
      if (place !== null) {
        return place.tenantId;
      }
    }
    const review = await this.dependencies.reviewRepository.findById(
      contentId as never,
    );
    if (review !== null) {
      return review.tenantId;
    }

    throw new DomainError("NOT_FOUND", "Content target not found.", {
      contentType,
      contentId,
    });
  }

  private async updateContentStatus(
    contentType: "ROUTE" | "PLACE" | "REVIEW",
    contentId: string,
    status: ContentApprovalStatus,
    now: IsoUtcDateTime,
  ): Promise<void> {
    if (contentType === "ROUTE") {
      const route = await this.dependencies.routeRepository.findById(
        contentId as never,
      );
      if (route === null) {
        throw new DomainError("NOT_FOUND", "Route not found.", { contentId });
      }
      await this.dependencies.routeRepository.save(
        updateContentEntityStatus(route, status, now),
        { expectedVersion: route.version },
      );
      return;
    }
    if (contentType === "PLACE") {
      const place = await this.dependencies.placeRepository.findById(
        contentId as never,
      );
      if (place === null) {
        throw new DomainError("NOT_FOUND", "Place not found.", { contentId });
      }
      await this.dependencies.placeRepository.save(
        updateContentEntityStatus(place, status, now),
        { expectedVersion: place.version },
      );
      return;
    }
    const review = await this.dependencies.reviewRepository.findById(
      contentId as never,
    );
    if (review === null) {
      throw new DomainError("NOT_FOUND", "Review not found.", { contentId });
    }
    await this.dependencies.reviewRepository.save(
      updateContentEntityStatus(review, status, now),
      { expectedVersion: review.version },
    );
  }

  private async getStore(storeId: StoreId) {
    const store = await this.dependencies.storeRepository.findById(storeId);
    if (store === null) {
      throw new DomainError("NOT_FOUND", "Store not found.", { storeId });
    }
    return store;
  }

  private async getReview(reviewId: ReviewId) {
    const review = await this.dependencies.reviewRepository.findById(reviewId);
    if (review === null) {
      throw new DomainError("NOT_FOUND", "Review not found.", { reviewId });
    }
    return review;
  }

  private async assertBranchStoreScope(
    storeId: StoreId,
    branchId?: BranchId | undefined,
  ) {
    if (branchId === undefined) {
      return;
    }
    const branch = await this.dependencies.branchRepository.findById(branchId);
    if (branch === null || branch.storeId !== storeId) {
      throw new DomainError(
        "PERMISSION_DENIED",
        "Content branch is outside store scope.",
        { storeId, branchId },
      );
    }
  }
}

export interface SerializedRoute {
  readonly id: RouteId;
  readonly tenant_id: string;
  readonly submitted_by_user_id: UserId;
  readonly store_id?: StoreId | undefined;
  readonly branch_id?: BranchId | undefined;
  readonly name: string;
  readonly description: string;
  readonly start_location: Location;
  readonly end_location: Location;
  readonly distance_meters: number;
  readonly difficulty: string;
  readonly surface?: string | undefined;
  readonly warning?: string | undefined;
  readonly suitable_bike_types: readonly string[];
  readonly status: ContentApprovalStatus;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: number;
}

export interface SerializedPlace {
  readonly id: PlaceId;
  readonly tenant_id: string;
  readonly submitted_by_user_id: UserId;
  readonly store_id?: StoreId | undefined;
  readonly branch_id?: BranchId | undefined;
  readonly name: string;
  readonly place_type: string;
  readonly location: Location;
  readonly status: ContentApprovalStatus;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: number;
}

export interface SerializedReview {
  readonly id: ReviewId;
  readonly tenant_id: string;
  readonly booking_id: BookingId;
  readonly user_id: UserId;
  readonly store_id: StoreId;
  readonly branch_id: BranchId;
  readonly rating: number;
  readonly body: string;
  readonly status: ContentApprovalStatus;
  readonly hidden_reason?: string | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: number;
}

export interface SerializedContentSubmission {
  readonly id: ContentSubmissionId;
  readonly tenant_id: string;
  readonly content_type: "ROUTE" | "PLACE" | "REVIEW";
  readonly content_id: string;
  readonly submitted_by_user_id: UserId;
  readonly status: ContentApprovalStatus;
  readonly moderation_reason?: string | undefined;
  readonly moderated_by_user_id?: UserId | undefined;
  readonly moderated_at?: IsoUtcDateTime | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: number;
}

export interface SerializedContentReport {
  readonly id: ContentReportId;
  readonly tenant_id: string;
  readonly content_type: "ROUTE" | "PLACE" | "REVIEW";
  readonly content_id: string;
  readonly reported_by_user_id: UserId;
  readonly reason: "UNSAFE" | "WRONG" | "OUTDATED" | "ABUSE" | "OTHER";
  readonly notes?: string | undefined;
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
  readonly version: number;
}

export const serializeRoute = (
  route: Awaited<ReturnType<ContentService["submitRoute"]>>,
): SerializedRoute => ({
  id: route.id,
  tenant_id: route.tenantId,
  submitted_by_user_id: route.submittedByUserId,
  store_id: route.storeId,
  branch_id: route.branchId,
  name: route.name,
  description: route.description,
  start_location: route.startLocation,
  end_location: route.endLocation,
  distance_meters: route.distanceMeters,
  difficulty: route.difficulty,
  surface: route.surface,
  warning: route.warning,
  suitable_bike_types: route.suitableBikeTypes,
  status: route.status,
  created_at: route.createdAt,
  updated_at: route.updatedAt,
  version: route.version as number,
});

export const serializePlace = (
  place: Awaited<ReturnType<ContentService["submitPlace"]>>,
): SerializedPlace => ({
  id: place.id,
  tenant_id: place.tenantId,
  submitted_by_user_id: place.submittedByUserId,
  store_id: place.storeId,
  branch_id: place.branchId,
  name: place.name,
  place_type: place.placeType,
  location: place.location,
  status: place.status,
  created_at: place.createdAt,
  updated_at: place.updatedAt,
  version: place.version as number,
});

export const serializeReview = (
  review: Awaited<ReturnType<ContentService["createReview"]>>,
): SerializedReview => ({
  id: review.id,
  tenant_id: review.tenantId,
  booking_id: review.bookingId,
  user_id: review.userId,
  store_id: review.storeId,
  branch_id: review.branchId,
  rating: review.rating,
  body: review.body,
  status: review.status,
  hidden_reason: review.hiddenReason,
  created_at: review.createdAt,
  updated_at: review.updatedAt,
  version: review.version as number,
});

export const serializeContentSubmission = (
  submission: Awaited<ReturnType<ContentService["approveSubmission"]>>,
): SerializedContentSubmission => ({
  id: submission.id,
  tenant_id: submission.tenantId,
  content_type: submission.contentType,
  content_id: submission.contentId,
  submitted_by_user_id: submission.submittedByUserId,
  status: submission.status,
  moderation_reason: submission.moderationReason,
  moderated_by_user_id: submission.moderatedByUserId,
  moderated_at: submission.moderatedAt,
  created_at: submission.createdAt,
  updated_at: submission.updatedAt,
  version: submission.version as number,
});

export const serializeContentReport = (
  report: Awaited<ReturnType<ContentService["reportContent"]>>,
): SerializedContentReport => ({
  id: report.id,
  tenant_id: report.tenantId,
  content_type: report.contentType,
  content_id: report.contentId,
  reported_by_user_id: report.reportedByUserId,
  reason: report.reason,
  notes: report.notes,
  created_at: report.createdAt,
  updated_at: report.updatedAt,
  version: report.version as number,
});
