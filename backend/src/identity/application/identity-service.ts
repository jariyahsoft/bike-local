import type { AuditLogWriter } from "./security-pipeline.js";
import { DomainError, asDomainId } from "../../shared/domain/index.js";
import type {
  AuthIdentityId,
  ConsentRecordId,
  CorrelationId,
  IsoUtcDateTime,
  UserId,
} from "../../shared/domain/index.js";
import type {
  AuditActor,
  AuditLogEntry,
} from "../../audit/domain/audit-log.js";
import {
  applyUserProfileUpdate,
  buildConsentRecords,
  consentStatusToAuditValue,
  createUserProfile,
  requestAccountDeletion,
  validateSelectedRoles,
} from "../domain/identity-policies.js";
import type {
  AuthIdentity,
  AuthIdentityRepository,
  AuthProvider,
  ConsentInput,
  ConsentRecord,
  ConsentRecordRepository,
  CreateUserProfileInput,
  User,
  UserProfileUpdate,
  UserRepository,
} from "../domain/identity-repository.js";
import type { RoleName } from "../domain/rbac.js";

export interface CreateUserServiceInput extends CreateUserProfileInput {
  readonly userId: UserId;
  readonly firebaseUid: string;
  readonly authProvider: AuthProvider;
  readonly authProviderSubject: string;
  readonly verified: boolean;
  readonly now: IsoUtcDateTime;
  readonly correlationId: CorrelationId;
}

export interface UpdateUserServiceInput extends UserProfileUpdate {
  readonly userId: UserId;
  readonly version: User["version"];
  readonly now: IsoUtcDateTime;
  readonly correlationId: CorrelationId;
}

export interface RequestAccountDeletionInput {
  readonly userId: UserId;
  readonly version: User["version"];
  readonly reason?: string | undefined;
  readonly now: IsoUtcDateTime;
  readonly correlationId: CorrelationId;
}

export interface CurrentUserProfile {
  readonly user: User;
  readonly authIdentities: readonly AuthIdentity[];
  readonly consents: readonly ConsentRecord[];
}

export interface IdentityServiceDependencies {
  readonly userRepository: UserRepository;
  readonly authIdentityRepository: AuthIdentityRepository;
  readonly consentRecordRepository: ConsentRecordRepository;
  readonly auditLogWriter: AuditLogWriter;
  readonly buildAuthIdentityId: () => AuthIdentityId;
  readonly buildConsentRecordId: (
    type: ConsentInput["type"],
  ) => ConsentRecordId;
}

const maskProviderSubject = (value: string): string => {
  if (value.length <= 4) {
    return "*".repeat(value.length);
  }

  return `${value.slice(0, 2)}***${value.slice(-2)}`;
};

const buildAuditActor = (user: User): AuditActor => ({
  actorType: "USER",
  actorUserId: user.id,
  roleNames: user.roles.map((role) => role.role),
});

const appendAudit = async (
  auditLogWriter: AuditLogWriter,
  entry: AuditLogEntry,
): Promise<void> => {
  await auditLogWriter.append(entry);
};

export class IdentityService {
  constructor(private readonly dependencies: IdentityServiceDependencies) {}

  async createUser(input: CreateUserServiceInput): Promise<CurrentUserProfile> {
    const existingByFirebaseUid =
      await this.dependencies.authIdentityRepository.findByFirebaseUid(
        input.firebaseUid,
      );
    if (existingByFirebaseUid !== null) {
      throw new DomainError(
        "AUTH_IDENTITY_ALREADY_LINKED",
        "Firebase identity is already linked to a domain user.",
        {
          firebaseUid: input.firebaseUid,
        },
      );
    }

    const existingByProvider =
      await this.dependencies.authIdentityRepository.findByProviderSubject({
        provider: input.authProvider,
        providerSubject: input.authProviderSubject,
      });
    if (existingByProvider !== null) {
      throw new DomainError(
        "AUTH_IDENTITY_ALREADY_LINKED",
        "Auth provider identity is already linked to a domain user.",
        {
          provider: input.authProvider,
        },
      );
    }

    const user = createUserProfile(input);
    const consents = buildConsentRecords({
      userId: input.userId,
      locale: input.locale,
      consents: input.consentInputs,
      now: input.now,
      buildId: (type) => this.dependencies.buildConsentRecordId(type),
      requireTermsAndPrivacy: true,
    });

    const authIdentity: AuthIdentity = {
      id: this.dependencies.buildAuthIdentityId(),
      userId: input.userId,
      provider: input.authProvider,
      providerSubject: input.authProviderSubject,
      firebaseUid: input.firebaseUid,
      verified: input.verified,
      lastAuthenticatedAt: input.now,
      createdAt: input.now,
      updatedAt: input.now,
      version: 1 as never,
    };

    await this.dependencies.userRepository.save(user);
    await this.dependencies.authIdentityRepository.save(authIdentity);
    for (const consent of consents) {
      await this.dependencies.consentRecordRepository.save(consent);
    }

    return {
      user,
      authIdentities: [authIdentity],
      consents,
    };
  }

  async getCurrentUserProfile(userId: UserId): Promise<CurrentUserProfile> {
    const user = await this.dependencies.userRepository.findById(userId);
    if (user === null) {
      throw new DomainError("NOT_FOUND", "User not found", {
        userId,
      });
    }

    const [authIdentities, consents] = await Promise.all([
      this.dependencies.authIdentityRepository.listByUserId(userId),
      this.dependencies.consentRecordRepository.listByUserId(userId),
    ]);

    return {
      user,
      authIdentities,
      consents,
    };
  }

  async updateCurrentUser(
    input: UpdateUserServiceInput,
  ): Promise<CurrentUserProfile> {
    const user = await this.dependencies.userRepository.findById(input.userId);
    if (user === null) {
      throw new DomainError("NOT_FOUND", "User not found", {
        userId: input.userId,
      });
    }

    const appendedConsents =
      input.consentInputs?.length === 0 || input.consentInputs === undefined
        ? []
        : buildConsentRecords({
            userId: user.id,
            locale: input.locale ?? user.locale,
            consents: input.consentInputs,
            now: input.now,
            buildId: (type) => this.dependencies.buildConsentRecordId(type),
            requireTermsAndPrivacy: false,
          });

    const updatedUser = applyUserProfileUpdate(
      user,
      {
        displayName: input.displayName,
        locale: input.locale,
        additionalRoles:
          input.additionalRoles === undefined
            ? undefined
            : validateSelectedRoles(input.additionalRoles),
        consentInputs: input.consentInputs,
      },
      input.now,
      appendedConsents,
    );

    await this.dependencies.userRepository.save(updatedUser, {
      expectedVersion: input.version,
    });
    for (const consent of appendedConsents) {
      await this.dependencies.consentRecordRepository.save(consent);
    }

    const authIdentities =
      await this.dependencies.authIdentityRepository.listByUserId(user.id);

    return {
      user: updatedUser,
      authIdentities,
      consents: [
        ...(await this.dependencies.consentRecordRepository.listByUserId(
          user.id,
        )),
      ],
    };
  }

  async requestAccountDeletion(
    input: RequestAccountDeletionInput,
  ): Promise<CurrentUserProfile> {
    const user = await this.dependencies.userRepository.findById(input.userId);
    if (user === null) {
      throw new DomainError("NOT_FOUND", "User not found", {
        userId: input.userId,
      });
    }

    const updatedUser = requestAccountDeletion(user, input.now);
    await this.dependencies.userRepository.save(updatedUser, {
      expectedVersion: input.version,
    });

    await appendAudit(this.dependencies.auditLogWriter, {
      action: "account.deletion.requested",
      resourceType: "user",
      resourceId: updatedUser.id,
      actor: buildAuditActor(updatedUser),
      reason:
        input.reason ??
        "Account deletion requested by the authenticated user. Transactional and legal records are retained with restricted access.",
      before: {
        status: user.status,
      },
      after: {
        status: updatedUser.status,
        deletion_requested_at: updatedUser.deletionRequestedAt,
      },
      metadata: {
        correlationId: input.correlationId,
        occurredAt: input.now,
        immutable: true,
        classification: "CONFIDENTIAL",
      },
      tenantId: updatedUser.tenantId,
    });

    return this.getCurrentUserProfile(updatedUser.id);
  }
}

export interface SerializedConsentSummary {
  readonly type: ConsentRecord["type"];
  readonly status: string;
  readonly version_code: string;
  readonly purpose: string;
  readonly granted_at: IsoUtcDateTime;
  readonly gps_scope?: ConsentRecord["gpsScope"] | undefined;
}

export interface SerializedAuthIdentity {
  readonly provider: AuthProvider;
  readonly provider_subject_hint: string;
  readonly verified: boolean;
  readonly last_authenticated_at: IsoUtcDateTime;
}

export interface SerializedCurrentUserProfile {
  readonly id: UserId;
  readonly display_name: string;
  readonly locale: User["locale"];
  readonly status: User["status"];
  readonly roles: readonly RoleName[];
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
  readonly consent_summaries: readonly SerializedConsentSummary[];
  readonly auth_identities: readonly SerializedAuthIdentity[];
  readonly deletion_requested_at?: IsoUtcDateTime | undefined;
  readonly version: User["version"];
  readonly created_at: IsoUtcDateTime;
  readonly updated_at: IsoUtcDateTime;
}

export const serializeCurrentUserProfile = (
  profile: CurrentUserProfile,
): SerializedCurrentUserProfile => ({
  id: profile.user.id,
  display_name: profile.user.displayName,
  locale: profile.user.locale,
  status: profile.user.status,
  roles: profile.user.roles.map((role) => role.role),
  email: profile.user.email,
  phone: profile.user.phone,
  consent_summaries: profile.consents.map((consent) => ({
    type: consent.type,
    status: consentStatusToAuditValue(consent.status),
    version_code: consent.versionCode,
    purpose: consent.purpose,
    granted_at: consent.grantedAt,
    gps_scope: consent.gpsScope,
  })),
  auth_identities: profile.authIdentities.map((identity) => ({
    provider: identity.provider,
    provider_subject_hint: maskProviderSubject(identity.providerSubject),
    verified: identity.verified,
    last_authenticated_at: identity.lastAuthenticatedAt,
  })),
  deletion_requested_at: profile.user.deletionRequestedAt,
  version: profile.user.version,
  created_at: profile.user.createdAt,
  updated_at: profile.user.updatedAt,
});

export const buildUserId = (value: string): UserId => asDomainId<"User">(value);
