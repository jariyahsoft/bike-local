export type DomainErrorCode =
  | "VALIDATION_INVALID"
  | "USER_ROLE_SELECTION_INVALID"
  | "USER_REQUIRED_CONSENT_MISSING"
  | "AUTH_IDENTITY_ALREADY_LINKED"
  | "USER_ALREADY_EXISTS"
  | "USER_ACCOUNT_DELETION_ALREADY_REQUESTED"
  | "STORE_OWNER_ROLE_REQUIRED"
  | "STORE_APPROVAL_TRANSITION_INVALID"
  | "STORE_NOT_APPROVED"
  | "BRANCH_TEMPORARY_CLOSURE_INVALID"
  | "STAFF_ROLE_INVALID"
  | "STAFF_INVITATION_CONTACT_REQUIRED"
  | "PERMISSION_DENIED"
  | "VERSION_CONFLICT"
  | "NOT_FOUND"
  | "BOOKING_ASSET_NOT_AVAILABLE"
  | "PAYMENT_VERIFICATION_REQUIRED"
  | "RETURN_INSPECTION_REQUIRED";

export class DomainError extends Error {
  constructor(
    public readonly code: DomainErrorCode,
    message: string,
    public readonly details: Readonly<Record<string, unknown>> = {},
  ) {
    super(message);
    this.name = "DomainError";
  }
}
