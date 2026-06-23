import type {
  AuthIdentityId,
  ConsentRecordId,
  EntityTimestamps,
  IsoUtcDateTime,
  Page,
  PageRequest,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
} from "../../shared/domain/index.js";
import type { Repository, SaveOptions } from "../../shared/domain/index.js";
import type { PermissionName, RoleName } from "./rbac.js";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETION_REQUESTED";
export type AuthProvider = "PHONE" | "EMAIL_PASSWORD" | "GOOGLE" | "APPLE";
export type ConsentType = "TERMS" | "PRIVACY" | "GPS" | "MARKETING";
export type ConsentStatus = "GRANTED" | "DENIED" | "REVOKED";
export type GpsConsentScope = "FOREGROUND_ONLY" | "BACKGROUND_ALLOWED";
export type OnboardingSelectableRole = Extract<
  RoleName,
  "RENTER" | "STORE_OWNER"
>;

export interface ConsentRecord extends VersionedEntity, EntityTimestamps {
  readonly id: ConsentRecordId;
  readonly userId: UserId;
  readonly type: ConsentType;
  readonly status: ConsentStatus;
  readonly versionCode: string;
  readonly purpose: string;
  readonly locale: "th" | "en";
  readonly grantedAt: IsoUtcDateTime;
  readonly revokedAt?: IsoUtcDateTime | undefined;
  readonly gpsScope?: GpsConsentScope | undefined;
}

export interface AuthIdentity extends VersionedEntity, EntityTimestamps {
  readonly id: AuthIdentityId;
  readonly userId: UserId;
  readonly provider: AuthProvider;
  readonly providerSubject: string;
  readonly firebaseUid: string;
  readonly verified: boolean;
  readonly lastAuthenticatedAt: IsoUtcDateTime;
}

export interface UserRoleSelection {
  readonly role: OnboardingSelectableRole;
  readonly selectedAt: IsoUtcDateTime;
}

export interface User
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: UserId;
  readonly displayName: string;
  readonly locale: "th" | "en";
  readonly status: UserStatus;
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
  readonly photoUrl?: string | undefined;
  readonly countryCode?: string | undefined;
  readonly weightKg?: number | undefined;
  readonly emergencyContact?: Readonly<Record<string, unknown>> | undefined;
  readonly roles: readonly UserRoleSelection[];
  readonly consentVersionSummary: Readonly<
    Record<ConsentType, string | undefined>
  >;
  readonly deletionRequestedAt?: IsoUtcDateTime | undefined;
}

export interface ConsentInput {
  readonly type: ConsentType;
  readonly status: ConsentStatus;
  readonly versionCode: string;
  readonly purpose: string;
  readonly gpsScope?: GpsConsentScope | undefined;
}

export interface UserProfileUpdate {
  readonly displayName?: string | undefined;
  readonly locale?: "th" | "en" | undefined;
  readonly additionalRoles?: readonly OnboardingSelectableRole[] | undefined;
  readonly consentInputs?: readonly ConsentInput[] | undefined;
}

export interface CreateUserProfileInput {
  readonly displayName: string;
  readonly locale: "th" | "en";
  readonly tenantId: TenantId;
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
  readonly selectedRoles: readonly OnboardingSelectableRole[];
  readonly consentInputs: readonly ConsentInput[];
}

export interface AuthIdentityLookup {
  readonly provider: AuthProvider;
  readonly providerSubject: string;
}

export interface UserRepository extends Repository<User, UserId> {
  findByStatus(status: UserStatus, page: PageRequest): Promise<Page<User>>;
  save(user: User, options?: SaveOptions): Promise<User>;
}

export interface AuthIdentityRepository extends Repository<
  AuthIdentity,
  AuthIdentityId
> {
  findByFirebaseUid(firebaseUid: string): Promise<AuthIdentity | null>;
  findByProviderSubject(
    lookup: AuthIdentityLookup,
  ): Promise<AuthIdentity | null>;
  listByUserId(userId: UserId): Promise<readonly AuthIdentity[]>;
  save(identity: AuthIdentity, options?: SaveOptions): Promise<AuthIdentity>;
}

export interface ConsentRecordRepository extends Repository<
  ConsentRecord,
  ConsentRecordId
> {
  listByUserId(userId: UserId): Promise<readonly ConsentRecord[]>;
  save(consent: ConsentRecord, options?: SaveOptions): Promise<ConsentRecord>;
}

export interface RoleDefinition {
  readonly name: RoleName;
  readonly description: string;
  readonly permissions: readonly PermissionName[];
}
