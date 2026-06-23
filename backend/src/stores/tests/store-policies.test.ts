import assert from "node:assert/strict";
import test from "node:test";

import {
  DomainError,
  asDomainId,
  asIsoUtcDateTime,
} from "../../shared/domain/index.js";
import {
  applyApprovalDecision,
  applyBranchUpdate,
  createBranchProfile,
  createStaffInvitationRecord,
  createStoreDraft,
  isBranchAvailableForBooking,
  submitStoreForApproval,
} from "../domain/store-policies.js";

const now = asIsoUtcDateTime("2026-06-23T14:00:00Z");

const createDraft = () =>
  createStoreDraft({
    storeId: asDomainId<"Store">("store_1"),
    tenantId: asDomainId<"Tenant">("store_1"),
    ownerUserId: asDomainId<"User">("usr_owner"),
    legalName: "Bike Local Demo Co.",
    displayName: "Bike Local Demo",
    defaultCurrency: "THB",
    timezone: "Asia/Bangkok",
    now,
  });

test("store approval workflow moves submitted stores to approved active status", () => {
  const submitted = submitStoreForApproval(createDraft(), now);
  const approved = applyApprovalDecision(
    submitted,
    "APPROVED",
    asDomainId<"User">("usr_admin"),
    "documents_verified",
    now,
  );

  assert.equal(submitted.approvalStatus, "SUBMITTED");
  assert.equal(approved.approvalStatus, "APPROVED");
  assert.equal(approved.operationalStatus, "ACTIVE");
});

test("branch availability requires approved store and active branch", () => {
  const approved = applyApprovalDecision(
    submitStoreForApproval(createDraft(), now),
    "APPROVED",
    asDomainId<"User">("usr_admin"),
    "documents_verified",
    now,
  );
  const branch = createBranchProfile({
    branchId: asDomainId<"Branch">("brn_1"),
    store: approved,
    name: "Old Town",
    address: "1 Demo Road",
    country: "TH",
    latitude: 13.7563,
    longitude: 100.5018,
    now,
  });

  assert.equal(isBranchAvailableForBooking(approved, branch), true);

  const closed = applyBranchUpdate(
    branch,
    {
      status: "TEMPORARILY_CLOSED",
      temporaryClosure: {
        reason: "storm_warning",
        reopenAt: asIsoUtcDateTime("2026-06-24T02:00:00Z"),
      },
    },
    now,
  );

  assert.equal(isBranchAvailableForBooking(approved, closed), false);
});

test("staff invitation requires channel-specific contact and assignable store role", () => {
  const store = createDraft();

  assert.throws(
    () =>
      createStaffInvitationRecord({
        invitationId: asDomainId<"StaffInvitation">("inv_1"),
        store,
        role: "PLATFORM_ADMIN",
        channel: "EMAIL",
        email: "staff@example.com",
        invitedByUserId: store.ownerUserId,
        now,
      }),
    (error) =>
      error instanceof DomainError && error.code === "STAFF_ROLE_INVALID",
  );

  assert.throws(
    () =>
      createStaffInvitationRecord({
        invitationId: asDomainId<"StaffInvitation">("inv_2"),
        store,
        role: "STORE_STAFF",
        channel: "PHONE",
        invitedByUserId: store.ownerUserId,
        now,
      }),
    (error) =>
      error instanceof DomainError &&
      error.code === "STAFF_INVITATION_CONTACT_REQUIRED",
  );
});
