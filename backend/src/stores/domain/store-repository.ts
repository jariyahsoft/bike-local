import type {
  BranchId,
  EntityTimestamps,
  IsoUtcDateTime,
  Page,
  PageRequest,
  SaveOptions,
  StaffInvitationId,
  StoreDocumentId,
  StoreId,
  StoreMemberId,
  TenantId,
  TenantScopedEntity,
  UserId,
  VersionedEntity,
} from "../../shared/domain/index.js";
import type { Repository } from "../../shared/domain/index.js";
import type { PermissionName, RoleName } from "../../identity/domain/rbac.js";

export type StoreApprovalStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REVISION_REQUIRED"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED"
  | "CLOSED";
export type StoreOperationalStatus =
  | "DRAFT"
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "CLOSED";
export type StoreDocumentType =
  | "BUSINESS_REGISTRATION"
  | "TAX_DOCUMENT"
  | "OWNER_IDENTITY"
  | "STORE_PHOTO"
  | "OTHER";
export type StoreDocumentStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";
export type BranchStatus = "ACTIVE" | "TEMPORARILY_CLOSED" | "INACTIVE";
export type StaffInvitationChannel = "EMAIL" | "PHONE" | "LINK" | "QR";
export type StaffInvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "EXPIRED"
  | "CANCELLED";
export type StoreMemberStatus = "ACTIVE" | "SUSPENDED";
export type StaffAssignableRole = Extract<
  RoleName,
  "STORE_MANAGER" | "STORE_STAFF" | "STORE_ACCOUNTING"
>;

export interface StoreDocumentMetadata extends EntityTimestamps {
  readonly id: StoreDocumentId;
  readonly type: StoreDocumentType;
  readonly storageObjectRef: string;
  readonly fileName: string;
  readonly contentType: string;
  readonly sizeBytes: number;
  readonly status: StoreDocumentStatus;
  readonly uploadedAt: IsoUtcDateTime;
}

export interface Store
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: StoreId;
  readonly ownerUserId: UserId;
  readonly legalName: string;
  readonly displayName: string;
  readonly description?: string | undefined;
  readonly phone?: string | undefined;
  readonly email?: string | undefined;
  readonly defaultCurrency: string;
  readonly timezone: string;
  readonly approvalStatus: StoreApprovalStatus;
  readonly operationalStatus: StoreOperationalStatus;
  readonly commissionPlanId?: string | undefined;
  readonly documentMetadata: readonly StoreDocumentMetadata[];
  readonly submittedAt?: IsoUtcDateTime | undefined;
  readonly reviewedAt?: IsoUtcDateTime | undefined;
  readonly reviewedBy?: UserId | undefined;
  readonly decisionReason?: string | undefined;
}

export interface TemporaryClosure {
  readonly reason: string;
  readonly reopenAt?: IsoUtcDateTime | undefined;
}

export interface Branch
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: BranchId;
  readonly storeId: StoreId;
  readonly name: string;
  readonly address: string;
  readonly province?: string | undefined;
  readonly district?: string | undefined;
  readonly country: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly geohash?: string | undefined;
  readonly phone?: string | undefined;
  readonly openingHours?: Readonly<Record<string, unknown>> | undefined;
  readonly timezone: string;
  readonly status: BranchStatus;
  readonly temporaryClosure?: TemporaryClosure | undefined;
}

export interface StaffInvitation
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: StaffInvitationId;
  readonly storeId: StoreId;
  readonly role: StaffAssignableRole;
  readonly channel: StaffInvitationChannel;
  readonly email?: string | undefined;
  readonly phone?: string | undefined;
  readonly inviteLinkHint?: string | undefined;
  readonly branchIds: readonly BranchId[];
  readonly permissionOverrides: readonly PermissionName[];
  readonly status: StaffInvitationStatus;
  readonly invitedByUserId: UserId;
  readonly expiresAt?: IsoUtcDateTime | undefined;
}

export interface StoreMember
  extends VersionedEntity, EntityTimestamps, TenantScopedEntity {
  readonly id: StoreMemberId;
  readonly storeId: StoreId;
  readonly userId: UserId;
  readonly role: StaffAssignableRole | "STORE_OWNER";
  readonly branchIds: readonly BranchId[];
  readonly grantedPermissions: readonly PermissionName[];
  readonly deniedPermissions: readonly PermissionName[];
  readonly status: StoreMemberStatus;
}

export interface CreateStoreDraftInput {
  readonly storeId: StoreId;
  readonly tenantId: TenantId;
  readonly ownerUserId: UserId;
  readonly legalName: string;
  readonly displayName: string;
  readonly description?: string | undefined;
  readonly phone?: string | undefined;
  readonly email?: string | undefined;
  readonly defaultCurrency: string;
  readonly timezone: string;
  readonly documentMetadata?: readonly StoreDocumentMetadata[] | undefined;
  readonly now: IsoUtcDateTime;
}

export interface CreateBranchInput {
  readonly branchId: BranchId;
  readonly store: Store;
  readonly name: string;
  readonly address: string;
  readonly province?: string | undefined;
  readonly district?: string | undefined;
  readonly country: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly geohash?: string | undefined;
  readonly phone?: string | undefined;
  readonly openingHours?: Readonly<Record<string, unknown>> | undefined;
  readonly timezone?: string | undefined;
  readonly now: IsoUtcDateTime;
}

export interface StoreRepository extends Repository<Store, StoreId> {
  listVisible(page: PageRequest): Promise<Page<Store>>;
  listByOwnerUserId(userId: UserId): Promise<readonly Store[]>;
  save(store: Store, options?: SaveOptions): Promise<Store>;
}

export interface BranchRepository extends Repository<Branch, BranchId> {
  listByStoreId(storeId: StoreId): Promise<readonly Branch[]>;
  save(branch: Branch, options?: SaveOptions): Promise<Branch>;
}

export interface StaffInvitationRepository extends Repository<
  StaffInvitation,
  StaffInvitationId
> {
  listByStoreId(storeId: StoreId): Promise<readonly StaffInvitation[]>;
  save(
    invitation: StaffInvitation,
    options?: SaveOptions,
  ): Promise<StaffInvitation>;
}

export interface StoreMemberRepository extends Repository<
  StoreMember,
  StoreMemberId
> {
  findByStoreAndUser(
    storeId: StoreId,
    userId: UserId,
  ): Promise<StoreMember | null>;
  listByStoreId(storeId: StoreId): Promise<readonly StoreMember[]>;
  listByUserId(userId: UserId): Promise<readonly StoreMember[]>;
  save(member: StoreMember, options?: SaveOptions): Promise<StoreMember>;
}
