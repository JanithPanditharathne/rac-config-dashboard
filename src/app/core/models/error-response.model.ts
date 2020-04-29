/**
 * Interface that represent an ErrorResponse.
 * @interface ErrorResponse.
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
