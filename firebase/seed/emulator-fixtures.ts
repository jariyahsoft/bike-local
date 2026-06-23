export interface AuthFixtureUser {
  readonly uid: string;
  readonly email: string;
  readonly displayName: string;
  readonly phoneNumber: string;
}

export interface FirestoreFixtureDocument {
  readonly id: string;
  readonly data: Record<string, unknown>;
}

export interface StorageFixtureObject {
  readonly path: string;
  readonly contentType: string;
  readonly body: string;
}

export const emulatorFixtureUsers: readonly AuthFixtureUser[] = [
  {
    uid: "firebase_renter_1",
    email: "renter@example.com",
    displayName: "Renter One",
    phoneNumber: "+66000000001",
  },
  {
    uid: "firebase_store_owner_1",
    email: "owner@example.com",
    displayName: "Store Owner One",
    phoneNumber: "+66000000002",
  },
  {
    uid: "firebase_store_manager_1",
    email: "manager@example.com",
    displayName: "Store Manager One",
    phoneNumber: "+66000000003",
  },
  {
    uid: "firebase_store_staff_1",
    email: "staff@example.com",
    displayName: "Store Staff One",
    phoneNumber: "+66000000004",
  },
  {
    uid: "firebase_store_accounting_1",
    email: "accounting@example.com",
    displayName: "Store Accounting One",
    phoneNumber: "+66000000005",
  },
  {
    uid: "firebase_platform_admin_1",
    email: "platform-admin@example.com",
    displayName: "Platform Admin One",
    phoneNumber: "+66000000006",
  },
];

export const emulatorFixtureCollections: Readonly<
  Record<string, readonly FirestoreFixtureDocument[]>
> = {
  system_configs: [
    {
      id: "marketplace_public",
      data: {
        title: "Bike Local public config",
        locale_default: "th",
        published: true,
      },
    },
  ],
  users: [
    {
      id: "usr_renter_1",
      data: {
        firebase_uid: "firebase_renter_1",
        display_name: "Renter One",
        locale: "th",
        tenant_id: "tenant_store_1",
        role_codes: ["RENTER"],
      },
    },
    {
      id: "usr_store_owner_1",
      data: {
        firebase_uid: "firebase_store_owner_1",
        display_name: "Store Owner One",
        locale: "en",
        tenant_id: "tenant_store_1",
        role_codes: ["STORE_OWNER"],
      },
    },
    {
      id: "usr_platform_admin_1",
      data: {
        firebase_uid: "firebase_platform_admin_1",
        display_name: "Platform Admin One",
        locale: "en",
        role_codes: ["PLATFORM_ADMIN"],
      },
    },
  ],
  auth_identities: [
    {
      id: "auth_renter_1",
      data: {
        provider: "password",
        firebase_uid: "firebase_renter_1",
        user_id: "usr_renter_1",
      },
    },
    {
      id: "auth_store_owner_1",
      data: {
        provider: "password",
        firebase_uid: "firebase_store_owner_1",
        user_id: "usr_store_owner_1",
      },
    },
  ],
  notifications: [
    {
      id: "notif_renter_1",
      data: {
        user_firebase_uid: "firebase_renter_1",
        status: "QUEUED",
        title: "Booking confirmed",
      },
    },
  ],
  stores: [
    {
      id: "store_approved_1",
      data: {
        tenant_id: "tenant_store_1",
        owner_user_id: "usr_store_owner_1",
        display_name: "Chiang Mai Trail Bikes",
        approval_status: "APPROVED",
        timezone: "Asia/Bangkok",
      },
    },
    {
      id: "store_draft_1",
      data: {
        tenant_id: "tenant_store_2",
        owner_user_id: "usr_store_owner_2",
        display_name: "Bangkok City Bikes",
        approval_status: "UNDER_REVIEW",
        timezone: "Asia/Bangkok",
      },
    },
  ],
  branches: [
    {
      id: "branch_hq_1",
      data: {
        tenant_id: "tenant_store_1",
        store_id: "store_approved_1",
        name: "Old City HQ",
        status: "ACTIVE",
      },
    },
    {
      id: "branch_satellite_1",
      data: {
        tenant_id: "tenant_store_1",
        store_id: "store_approved_1",
        name: "Riverside Pickup",
        status: "TEMPORARILY_CLOSED",
      },
    },
  ],
  assets: [
    {
      id: "asset_bike_1",
      data: {
        tenant_id: "tenant_store_1",
        store_id: "store_approved_1",
        branch_id: "branch_hq_1",
        code: "CM-001",
        status: "AVAILABLE",
        category: "mountain-bike",
      },
    },
    {
      id: "asset_bike_2",
      data: {
        tenant_id: "tenant_store_1",
        store_id: "store_approved_1",
        branch_id: "branch_hq_1",
        code: "CM-002",
        status: "RENTED",
        category: "city-bike",
      },
    },
  ],
  pricing_rules: [
    {
      id: "pricing_rule_1",
      data: {
        tenant_id: "tenant_store_1",
        store_id: "store_approved_1",
        branch_id: "branch_hq_1",
        base_hourly_amount: 25000,
        currency: "THB",
      },
    },
  ],
  bookings: [
    {
      id: "booking_1",
      data: {
        tenant_id: "tenant_store_1",
        user_id: "usr_renter_1",
        store_id: "store_approved_1",
        branch_id: "branch_hq_1",
        asset_id: "asset_bike_2",
        status: "IN_PROGRESS",
      },
    },
  ],
  payments: [
    {
      id: "payment_1",
      data: {
        tenant_id: "tenant_store_1",
        booking_id: "booking_1",
        status: "PAID",
        amount: 120000,
        currency: "THB",
      },
    },
  ],
  deposits: [
    {
      id: "deposit_1",
      data: {
        tenant_id: "tenant_store_1",
        booking_id: "booking_1",
        status: "HELD",
        amount: 50000,
      },
    },
  ],
  ride_sessions: [
    {
      id: "ride_session_1",
      data: {
        tenant_id: "tenant_store_1",
        booking_id: "booking_1",
        status: "ACTIVE",
        last_chunk_sequence: 4,
      },
    },
  ],
  return_requests: [
    {
      id: "return_request_1",
      data: {
        tenant_id: "tenant_store_1",
        booking_id: "booking_1",
        status: "INSPECTION_PENDING",
      },
    },
  ],
  sos_cases: [
    {
      id: "sos_case_1",
      data: {
        tenant_id: "tenant_store_1",
        booking_id: "booking_1",
        status: "ACKNOWLEDGED",
        issue_type: "breakdown",
      },
    },
  ],
  audit_logs: [
    {
      id: "audit_1",
      data: {
        tenant_id: "tenant_store_1",
        action: "payment.cash.confirmed",
        resource_type: "payment",
        resource_id: "payment_1",
        immutable: true,
      },
    },
  ],
};

export const emulatorFixtureStorageObjects: readonly StorageFixtureObject[] = [
  {
    path: "public/config/welcome.txt",
    contentType: "text/plain",
    body: "Bike Local public emulator asset",
  },
  {
    path: "audit-evidence/tenant_store_1/payment_1.txt",
    contentType: "text/plain",
    body: "restricted audit placeholder",
  },
];
