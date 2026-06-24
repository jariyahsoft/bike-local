import {
  SecurityError,
  mapSecurityErrorToApiResponse,
} from "../../identity/api/security-error.js";
import {
  authorizeRequest,
  defaultPermissionChecker,
  type SecurityPipelineDependencies,
} from "../../identity/application/security-pipeline.js";
import { buildApiErrorResponse } from "../../shared/api/api-error.js";
import {
  DomainError,
  asDomainId,
  type ContentReportId,
  type ContentSubmissionId,
  type CorrelationId,
  type IsoUtcDateTime,
  type PlaceId,
  type ReviewId,
  type RouteId,
} from "../../shared/domain/index.js";
import type { Location } from "../../shared/domain/location.js";
import {
  serializeContentReport,
  serializeContentSubmission,
  serializePlace,
  serializeReview,
  serializeRoute,
  type ContentService,
} from "../application/content-service.js";

export interface ContentApiDependencies {
  readonly security: SecurityPipelineDependencies;
  readonly contentService: ContentService;
  readonly now: () => IsoUtcDateTime;
  readonly buildRouteId: () => string;
  readonly buildPlaceId: () => string;
  readonly buildReviewId: () => string;
  readonly buildContentSubmissionId: () => string;
  readonly buildContentReportId: () => string;
}

const mapDomainError = (error: DomainError, requestId: string) => ({
  status:
    error.code === "NOT_FOUND"
      ? 404
      : error.code === "PERMISSION_DENIED" ||
          error.code === "CONTENT_SUBMITTER_ROLE_REQUIRED"
        ? 403
        : 422,
  body: buildApiErrorResponse(
    error.code,
    error.message,
    { ...error.details },
    requestId,
  ),
});

const serializeLocation = (location: {
  readonly latitude: number;
  readonly longitude: number;
  readonly accuracy_meters: number;
}): Location => ({
  latitude: location.latitude,
  longitude: location.longitude,
  accuracyMeters: location.accuracy_meters,
});

export const createRouteEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly body: {
      readonly store_id: string;
      readonly branch_id?: string | undefined;
      readonly name: string;
      readonly description: string;
      readonly start_location: {
        readonly latitude: number;
        readonly longitude: number;
        readonly accuracy_meters: number;
      };
      readonly end_location: {
        readonly latitude: number;
        readonly longitude: number;
        readonly accuracy_meters: number;
      };
      readonly distance_meters: number;
      readonly difficulty: string;
      readonly surface?: string | undefined;
      readonly warning?: string | undefined;
      readonly suitable_bike_types?: readonly string[] | undefined;
    };
  },
  dependencies: ContentApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    const route = await dependencies.contentService.submitRoute({
      routeId: asDomainId<"Route">(dependencies.buildRouteId()) as RouteId,
      contentSubmissionId: asDomainId<"ContentSubmission">(
        dependencies.buildContentSubmissionId(),
      ) as ContentSubmissionId,
      actorUserId: context.user.userId,
      assignments: context.assignments,
      storeId: request.body.store_id as never,
      branchId: request.body.branch_id as never,
      name: request.body.name,
      description: request.body.description,
      startLocation: serializeLocation(request.body.start_location),
      endLocation: serializeLocation(request.body.end_location),
      distanceMeters: request.body.distance_meters,
      difficulty: request.body.difficulty,
      surface: request.body.surface,
      warning: request.body.warning,
      suitableBikeTypes: request.body.suitable_bike_types,
      now: dependencies.now(),
    });
    return {
      status: 201,
      body: {
        data: serializeRoute(route),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const createPlaceEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly body: {
      readonly store_id: string;
      readonly branch_id?: string | undefined;
      readonly name: string;
      readonly place_type: string;
      readonly location: {
        readonly latitude: number;
        readonly longitude: number;
        readonly accuracy_meters: number;
      };
    };
  },
  dependencies: ContentApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    const place = await dependencies.contentService.submitPlace({
      placeId: asDomainId<"Place">(dependencies.buildPlaceId()) as PlaceId,
      contentSubmissionId: asDomainId<"ContentSubmission">(
        dependencies.buildContentSubmissionId(),
      ) as ContentSubmissionId,
      actorUserId: context.user.userId,
      assignments: context.assignments,
      storeId: request.body.store_id as never,
      branchId: request.body.branch_id as never,
      name: request.body.name,
      placeType: request.body.place_type,
      location: serializeLocation(request.body.location),
      now: dependencies.now(),
    });
    return {
      status: 201,
      body: {
        data: serializePlace(place),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const approveContentSubmissionEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly contentSubmissionId: ContentSubmissionId;
    readonly body: { readonly reason: string };
  },
  dependencies: ContentApiDependencies,
) => {
  try {
    const submission = await dependencies.contentService.getSubmission(
      request.contentSubmissionId,
    );
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    defaultPermissionChecker.assertAllowed({
      actorUserId: context.user.userId,
      permission: "content.approve",
      assignments: context.assignments,
      target: { tenantId: submission.tenantId },
    });
    const updated = await dependencies.contentService.approveSubmission({
      contentSubmissionId: request.contentSubmissionId,
      actorUserId: context.user.userId,
      reason: request.body.reason,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeContentSubmission(updated),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const rejectContentSubmissionEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly contentSubmissionId: ContentSubmissionId;
    readonly body: { readonly reason: string };
  },
  dependencies: ContentApiDependencies,
) => {
  try {
    const submission = await dependencies.contentService.getSubmission(
      request.contentSubmissionId,
    );
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    defaultPermissionChecker.assertAllowed({
      actorUserId: context.user.userId,
      permission: "content.approve",
      assignments: context.assignments,
      target: { tenantId: submission.tenantId },
    });
    const updated = await dependencies.contentService.rejectSubmission({
      contentSubmissionId: request.contentSubmissionId,
      actorUserId: context.user.userId,
      reason: request.body.reason,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeContentSubmission(updated),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const createReviewEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly body: {
      readonly booking_id: string;
      readonly rating: number;
      readonly body: string;
    };
  },
  dependencies: ContentApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    const review = await dependencies.contentService.createReview({
      reviewId: asDomainId<"Review">(dependencies.buildReviewId()) as ReviewId,
      contentSubmissionId: asDomainId<"ContentSubmission">(
        dependencies.buildContentSubmissionId(),
      ) as ContentSubmissionId,
      bookingId: request.body.booking_id as never,
      actorUserId: context.user.userId,
      rating: request.body.rating,
      body: request.body.body,
      now: dependencies.now(),
    });
    return {
      status: 201,
      body: {
        data: serializeReview(review),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const reportContentEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly body: {
      readonly content_type: "ROUTE" | "PLACE" | "REVIEW";
      readonly content_id: string;
      readonly reason: "UNSAFE" | "WRONG" | "OUTDATED" | "ABUSE" | "OTHER";
      readonly notes?: string | undefined;
    };
  },
  dependencies: ContentApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    const report = await dependencies.contentService.reportContent({
      contentReportId: asDomainId<"ContentReport">(
        dependencies.buildContentReportId(),
      ) as ContentReportId,
      actorUserId: context.user.userId,
      contentType: request.body.content_type,
      contentId: request.body.content_id,
      reason: request.body.reason,
      notes: request.body.notes,
      now: dependencies.now(),
    });
    return {
      status: 201,
      body: {
        data: serializeContentReport(report),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};

export const hideReviewEndpoint = async (
  request: {
    readonly requestId: CorrelationId;
    readonly authorizationHeader?: string;
    readonly appCheckHeader?: string;
    readonly reviewId: ReviewId;
    readonly body: { readonly reason: string };
  },
  dependencies: ContentApiDependencies,
) => {
  try {
    const context = await authorizeRequest({
      requestId: request.requestId,
      authorizationHeader: request.authorizationHeader,
      appCheckHeader: request.appCheckHeader,
      requirement: { appCheck: "required", permissions: [] },
      target: {},
      dependencies: dependencies.security,
    });
    defaultPermissionChecker.assertAllowed({
      actorUserId: context.user.userId,
      permission: "content.approve",
      assignments: context.assignments,
      target: {},
    });
    const review = await dependencies.contentService.hideReview({
      reviewId: request.reviewId,
      actorUserId: context.user.userId,
      reason: request.body.reason,
      now: dependencies.now(),
    });
    return {
      status: 200,
      body: {
        data: serializeReview(review),
        meta: { request_id: request.requestId },
      },
    };
  } catch (error) {
    if (error instanceof SecurityError) {
      return mapSecurityErrorToApiResponse(error, request.requestId);
    }
    if (error instanceof DomainError) {
      return mapDomainError(error, request.requestId);
    }
    throw error;
  }
};
