/**
 * General API type definitions
 */

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  details?: unknown;
}

