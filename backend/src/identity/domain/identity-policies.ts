import { DomainError } from "../../shared/domain/index.js";
import type { IsoUtcDateTime, UserId } from "../../shared/domain/index.js";
import type {
  ConsentInput,
  ConsentRecord,
  ConsentStatus,
  ConsentType,
  CreateUserProfileInput,
  OnboardingSelectableRole,
  User,
  UserProfileUpdate,
  UserRoleSelection,
} from "./identity-repository.js";

const allowedOnboardingRoles = new Set<OnboardingSelectableRole>([
  "RENTER",
  "STORE_OWNER",
]);

const requiredConsentTypes: readonly ConsentType[] = ["TERMS", "PRIVACY"];

const ensureNonEmpty = (value: string | undefined, field: string): string => {
  if (value === undefined || value.trim() === "") {
    throw new DomainError("VALIDATION_INVALID", `${field} is required`, {
      field,
    });
  }

  return value.trim();
};

export const validateSelectedRoles = (
  roles: readonly string[],
): readonly OnboardingSelectableRole[] => {
  const uniqueRoles = [...new Set(roles)];
  if (uniqueRoles.length === 0) {
    throw new DomainError(
      "USER_ROLE_SELECTION_INVALID",
      "At least one onboarding role must be selected.",
      {
        field: "selected_roles",
      },
    );
  }

  const invalidRoles = uniqueRoles.filter(
    (role) => !allowedOnboardingRoles.has(role as OnboardingSelectableRole),
  );

  if (invalidRoles.length > 0) {
    throw new DomainError(
      "USER_ROLE_SELECTION_INVALID",
      "Only renter and store owner roles are selectable during onboarding.",
      {
        invalidRoles,
      },
    );
  }

  return uniqueRoles as readonly OnboardingSelectableRole[];
};

const normalizeConsent = (
  consent: ConsentInput,
  locale: "th" | "en",
  userId: UserId,
  now: IsoUtcDateTime,
  buildId: (type: ConsentType) => string,
): ConsentRecord => {
  ensureNonEmpty(consent.versionCode, `${consent.type.toLowerCase()}_version`);
  ensureNonEmpty(consent.purpose, `${consent.type.toLowerCase()}_purpose`);

  if (consent.type === "GPS" && consent.gpsScope === undefined) {
    throw new DomainError(
      "USER_REQUIRED_CONSENT_MISSING",
      "GPS consent must state whether background location is allowed.",
      {
        field: "consents.gps_scope",
      },
    );
  }

  return {
    id: buildId(consent.type) as ConsentRecord["id"],
    userId,
    type: consent.type,
    status: consent.status,
    versionCode: consent.versionCode,
    purpose: consent.purpose,
    locale,
    grantedAt: now,
    gpsScope: consent.gpsScope,
    createdAt: now,
    updatedAt: now,
    version: 1 as never,
  };
};

const findConsent = (
  consents: readonly ConsentInput[],
  type: ConsentType,
): ConsentInput | undefined =>
  consents.find((consent) => consent.type === type);

export const buildConsentRecords = (input: {
  readonly userId: UserId;
  readonly locale: "th" | "en";
  readonly consents: readonly ConsentInput[];
  readonly now: IsoUtcDateTime;
  readonly buildId: (type: ConsentType) => string;
  readonly requireTermsAndPrivacy?: boolean;
}): readonly ConsentRecord[] => {
  if (input.requireTermsAndPrivacy ?? true) {
    for (const requiredType of requiredConsentTypes) {
      const consent = findConsent(input.consents, requiredType);
      if (consent === undefined || consent.status !== "GRANTED") {
        throw new DomainError(
          "USER_REQUIRED_CONSENT_MISSING",
          `${requiredType} consent must be granted during onboarding.`,
          {
            consentType: requiredType,
          },
        );
      }
    }
  }

  return input.consents.map((consent) =>
    normalizeConsent(
      consent,
      input.locale,
      input.userId,
      input.now,
      input.buildId,
    ),
  );
};

export const buildUserRoleSelections = (
  roles: readonly OnboardingSelectableRole[],
  selectedAt: IsoUtcDateTime,
): readonly UserRoleSelection[] =>
  roles.map((role) => ({
    role,
    selectedAt,
  }));

const mergeRoleSelections = (
  existing: readonly UserRoleSelection[],
  additionalRoles: readonly OnboardingSelectableRole[],
  selectedAt: IsoUtcDateTime,
): readonly UserRoleSelection[] => {
  const nextRoles = new Map(
    existing.map((selection) => [selection.role, selection]),
  );
  for (const role of validateSelectedRoles(additionalRoles)) {
    if (!nextRoles.has(role)) {
      nextRoles.set(role, {
        role,
        selectedAt,
      });
    }
  }

  return [...nextRoles.values()];
};

const nextConsentVersionSummary = (
  existingSummary: User["consentVersionSummary"],
  consents: readonly ConsentRecord[],
): User["consentVersionSummary"] => {
  const nextSummary: Record<ConsentType, string | undefined> = {
    TERMS: existingSummary.TERMS,
    PRIVACY: existingSummary.PRIVACY,
    GPS: existingSummary.GPS,
    MARKETING: existingSummary.MARKETING,
  };

  for (const consent of consents) {
    nextSummary[consent.type] = consent.versionCode;
  }

  return nextSummary;
};

export const createUserProfile = (
  input: CreateUserProfileInput & {
    readonly userId: UserId;
    readonly now: IsoUtcDateTime;
  },
): User => ({
  id: input.userId,
  tenantId: input.tenantId as User["tenantId"],
  displayName: ensureNonEmpty(input.displayName, "display_name"),
  locale: input.locale,
  status: "ACTIVE",
  email: input.email,
  phone: input.phone,
  roles: buildUserRoleSelections(
    validateSelectedRoles(input.selectedRoles),
    input.now,
  ),
  consentVersionSummary: nextConsentVersionSummary(
    {
      TERMS: undefined,
      PRIVACY: undefined,
      GPS: undefined,
      MARKETING: undefined,
    },
    buildConsentRecords({
      userId: input.userId,
      locale: input.locale,
      consents: input.consentInputs,
      now: input.now,
      buildId: () => "preview",
      requireTermsAndPrivacy: true,
    }),
  ),
  createdAt: input.now,
  updatedAt: input.now,
  version: 1 as never,
});

export const applyUserProfileUpdate = (
  user: User,
  update: UserProfileUpdate,
  now: IsoUtcDateTime,
  appendedConsents: readonly ConsentRecord[],
): User => ({
  ...user,
  displayName:
    update.displayName === undefined
      ? user.displayName
      : ensureNonEmpty(update.displayName, "display_name"),
  locale: update.locale ?? user.locale,
  roles:
    update.additionalRoles === undefined
      ? user.roles
      : mergeRoleSelections(user.roles, update.additionalRoles, now),
  consentVersionSummary: nextConsentVersionSummary(
    user.consentVersionSummary,
    appendedConsents,
  ),
  updatedAt: now,
  version: ((user.version as number) + 1) as User["version"],
});

export const requestAccountDeletion = (
  user: User,
  now: IsoUtcDateTime,
): User => {
  if (user.status === "DELETION_REQUESTED") {
    throw new DomainError(
      "USER_ACCOUNT_DELETION_ALREADY_REQUESTED",
      "Account deletion has already been requested.",
      {
        userId: user.id,
      },
    );
  }

  return {
    ...user,
    status: "DELETION_REQUESTED",
    deletionRequestedAt: now,
    updatedAt: now,
    version: ((user.version as number) + 1) as User["version"],
  };
};

export const consentStatusToAuditValue = (status: ConsentStatus): string =>
  status;
