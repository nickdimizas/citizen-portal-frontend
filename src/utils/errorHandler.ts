import type { AxiosError } from 'axios';

export const extractErrorMessage = (error: AxiosError): string => {
  if (error.response) {
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

  return error.message || 'Unexpected error';
};
