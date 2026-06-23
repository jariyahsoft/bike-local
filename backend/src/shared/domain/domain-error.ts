export type DomainErrorCode =
  | "VALIDATION_INVALID"
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
