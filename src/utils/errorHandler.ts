import type { AxiosError } from 'axios';

interface BackendErrorData {
  field: string;
  message: string;
}

interface BackendErrorResponse {
  status: boolean;
  message: string;
  data: BackendErrorData[];
}

export const extractErrorMessage = (error: AxiosError<BackendErrorResponse>): string => {
  if (error.response) {
    const responseData = error.response.data;

    // Check if backend sent a detailed error array
    if (responseData?.data && responseData.data.length > 0) {
      // Return the first error's message (or you can join all messages if you want)
      return responseData.data[0].message;
    }

    // fallback to the generic backend message
    if (responseData?.message) {
      return responseData.message;
    }

    // fallback by status code
    switch (error.response.status) {
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Invalid username or password.';
      case 403:
        return 'You are not allowed to access this resource.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'An unexpected error occurred.';
    }
  }

  // Network / no response
  return error.message || 'Unexpected error';
};
