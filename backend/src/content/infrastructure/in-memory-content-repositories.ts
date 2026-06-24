import { DomainError } from "../../shared/domain/index.js";
import type {
  Page,
  PageRequest,
  SaveOptions,
} from "../../shared/domain/index.js";
import type {
  ContentReport,
  ContentReportRepository,
  ContentSubmission,
  ContentSubmissionRepository,
  ContentSubmissionSearchFilter,
  Place,
  PlaceRepository,
  Review,
  ReviewRepository,
  ReviewSearchFilter,
  Route,
  RouteRepository,
} from "../domain/content-repository.js";

const assertExpectedVersion = <T extends { readonly version: unknown }>(
  current: T | undefined,
  expectedVersion: SaveOptions["expectedVersion"],
  message: string,
  details: Readonly<Record<string, unknown>>,
): void => {
  if (expectedVersion !== undefined && current?.version !== expectedVersion) {
    throw new DomainError("VERSION_CONFLICT", message, details);
  }
};

export class InMemoryRouteRepository implements RouteRepository {
  private readonly routes = new Map<Route["id"], Route>();

  async findById(id: Route["id"]): Promise<Route | null> {
    return this.routes.get(id) ?? null;
  }

  async save(route: Route, options?: SaveOptions): Promise<Route> {
    assertExpectedVersion(
      this.routes.get(route.id),
      options?.expectedVersion,
      "Route version conflict",
      {
        routeId: route.id,
      },
    );
    this.routes.set(route.id, route);
    return route;
  }
}

export class InMemoryPlaceRepository implements PlaceRepository {
  private readonly places = new Map<Place["id"], Place>();

  async findById(id: Place["id"]): Promise<Place | null> {
    return this.places.get(id) ?? null;
  }

  async save(place: Place, options?: SaveOptions): Promise<Place> {
    assertExpectedVersion(
      this.places.get(place.id),
      options?.expectedVersion,
      "Place version conflict",
      {
        placeId: place.id,
      },
    );
    this.places.set(place.id, place);
    return place;
  }
}

export class InMemoryReviewRepository implements ReviewRepository {
  private readonly reviews = new Map<Review["id"], Review>();

  async findById(id: Review["id"]): Promise<Review | null> {
    return this.reviews.get(id) ?? null;
  }

  async findByBookingAndUser(
    bookingId: Review["bookingId"],
    userId: Review["userId"],
  ): Promise<Review | null> {
    return (
      [...this.reviews.values()].find(
        (review) => review.bookingId === bookingId && review.userId === userId,
      ) ?? null
    );
  }

  async search(
    filter: ReviewSearchFilter,
    page: PageRequest,
  ): Promise<Page<Review>> {
    const items = [...this.reviews.values()]
      .filter((review) => review.tenantId === filter.tenantId)
      .filter(
        (review) =>
          filter.storeId === undefined || review.storeId === filter.storeId,
      )
      .filter(
        (review) =>
          filter.bookingId === undefined ||
          review.bookingId === filter.bookingId,
      )
      .slice(0, page.limit);

    return { items };
  }

  async save(review: Review, options?: SaveOptions): Promise<Review> {
    assertExpectedVersion(
      this.reviews.get(review.id),
      options?.expectedVersion,
      "Review version conflict",
      {
        reviewId: review.id,
      },
    );
    this.reviews.set(review.id, review);
    return review;
  }
}

export class InMemoryContentSubmissionRepository implements ContentSubmissionRepository {
  private readonly submissions = new Map<
    ContentSubmission["id"],
    ContentSubmission
  >();

  async findById(
    id: ContentSubmission["id"],
  ): Promise<ContentSubmission | null> {
    return this.submissions.get(id) ?? null;
  }

  async findByContent(
    contentType: ContentSubmission["contentType"],
    contentId: string,
  ): Promise<ContentSubmission | null> {
    return (
      [...this.submissions.values()].find(
        (submission) =>
          submission.contentType === contentType &&
          submission.contentId === contentId,
      ) ?? null
    );
  }

  async search(
    filter: ContentSubmissionSearchFilter,
    page: PageRequest,
  ): Promise<Page<ContentSubmission>> {
    const items = [...this.submissions.values()]
      .filter((submission) => submission.tenantId === filter.tenantId)
      .filter(
        (submission) =>
          filter.status === undefined || submission.status === filter.status,
      )
      .filter(
        (submission) =>
          filter.contentType === undefined ||
          submission.contentType === filter.contentType,
      )
      .slice(0, page.limit);

    return { items };
  }

  async save(
    submission: ContentSubmission,
    options?: SaveOptions,
  ): Promise<ContentSubmission> {
    assertExpectedVersion(
      this.submissions.get(submission.id),
      options?.expectedVersion,
      "Content submission version conflict",
      { contentSubmissionId: submission.id },
    );
    this.submissions.set(submission.id, submission);
    return submission;
  }
}

export class InMemoryContentReportRepository implements ContentReportRepository {
  private readonly reports = new Map<ContentReport["id"], ContentReport>();

  async findById(id: ContentReport["id"]): Promise<ContentReport | null> {
    return this.reports.get(id) ?? null;
  }

  async save(
    report: ContentReport,
    options?: SaveOptions,
  ): Promise<ContentReport> {
    assertExpectedVersion(
      this.reports.get(report.id),
      options?.expectedVersion,
      "Content report version conflict",
      {
        contentReportId: report.id,
      },
    );
    this.reports.set(report.id, report);
    return report;
  }
}
