import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { type ChangePasswordFormInputs } from '@/validators/userValidator';
import { changePasswordApi } from '@/apis/userApi';
import { extractErrorMessage, type BackendErrorResponse } from '@/utils/errorHandler';
import { type ChangePasswordResponse } from '@/types/api';

export const useChangePassword = () => {
  return useMutation<
    ChangePasswordResponse,
    AxiosError<BackendErrorResponse>,
    ChangePasswordFormInputs
  >({
    mutationFn: changePasswordApi,
    onSuccess: (res) => {
      console.log('Password changed successfully', res);
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      console.error('Error changing password:', message);
    },
  });
};
