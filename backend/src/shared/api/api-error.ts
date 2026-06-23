export interface ApiError<
  Details extends Record<string, unknown> = Record<string, unknown>,
> {
  readonly code: string;
  readonly message: string;
  readonly details: Details;
  readonly request_id: string;
}

export interface ApiErrorResponse<
  Details extends Record<string, unknown> = Record<string, unknown>,
> {
  readonly error: ApiError<Details>;
}

export const buildApiErrorResponse = <Details extends Record<string, unknown>>(
  code: string,
  message: string,
  details: Details,
  requestId: string,
): ApiErrorResponse<Details> => ({
  error: {
    code,
    message,
    details,
    request_id: requestId,
  },
});
