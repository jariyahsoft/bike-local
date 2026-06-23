export type Brand<T, Name extends string> = T & { readonly __brand: Name };

export type DomainId<Entity extends string = string> = Brand<
  string,
  `${Entity}Id`
>;
export type TenantId = DomainId<"Tenant">;
export type UserId = DomainId<"User">;
export type AuthIdentityId = DomainId<"AuthIdentity">;
export type ConsentRecordId = DomainId<"ConsentRecord">;
export type StoreId = DomainId<"Store">;
export type BranchId = DomainId<"Branch">;
export type StoreDocumentId = DomainId<"StoreDocument">;
export type StoreMemberId = DomainId<"StoreMember">;
export type StaffInvitationId = DomainId<"StaffInvitation">;
export type BookingId = DomainId<"Booking">;
export type PaymentId = DomainId<"Payment">;
export type RideSessionId = DomainId<"RideSession">;
export type ReturnRequestId = DomainId<"ReturnRequest">;
export type AssetId = DomainId<"Asset">;
export type AssetCategoryId = DomainId<"AssetCategory">;
export type EquipmentItemId = DomainId<"EquipmentItem">;
export type InventoryUnitId = DomainId<"InventoryUnit">;
export type RentalPointId = DomainId<"RentalPoint">;
export type PricingRuleId = DomainId<"PricingRule">;
export type AvailabilityBlockId = DomainId<"AvailabilityBlock">;
export type CorrelationId = Brand<string, "CorrelationId">;
export type IdempotencyKey = Brand<string, "IdempotencyKey">;

export type IsoUtcDateTime = Brand<string, "IsoUtcDateTime">;
export type MinorUnitAmount = Brand<number, "MinorUnitAmount">;
export type EntityVersion = Brand<number, "EntityVersion">;

export interface Money {
  readonly amount: MinorUnitAmount;
  readonly currency: string;
}

export interface EntityTimestamps {
  readonly createdAt: IsoUtcDateTime;
  readonly updatedAt: IsoUtcDateTime;
}

export interface VersionedEntity {
  readonly version: EntityVersion;
}

export interface TenantScopedEntity {
  readonly tenantId: TenantId;
}

export interface PageRequest {
  readonly cursor?: string;
  readonly limit: number;
}

export interface Page<T> {
  readonly items: readonly T[];
  readonly nextCursor?: string;
}

export interface RequestContext {
  readonly actorUserId?: UserId;
  readonly tenantId?: TenantId;
  readonly correlationId: CorrelationId;
}

export interface AuditMetadata {
  readonly actorUserId?: UserId;
  readonly action: string;
  readonly resourceType: string;
  readonly resourceId: string;
  readonly reason?: string;
  readonly correlationId: CorrelationId;
  readonly occurredAt: IsoUtcDateTime;
}

export const asDomainId = <Entity extends string>(
  value: string,
): DomainId<Entity> => value as DomainId<Entity>;
export const asMinorUnitAmount = (value: number): MinorUnitAmount => {
  if (!Number.isInteger(value)) {
    throw new Error("Money must use integer minor units");
  }
  return value as MinorUnitAmount;
};
export const asEntityVersion = (value: number): EntityVersion => {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Entity version must be a non-negative integer");
  }
  return value as EntityVersion;
};
export const asIsoUtcDateTime = (value: string): IsoUtcDateTime =>
  value as IsoUtcDateTime;
