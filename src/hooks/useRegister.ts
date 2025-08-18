import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { RegisterFormInputs } from '@/validators/authValidator';
import { registerApi } from '@/apis/authApi';
import type { BackendErrorResponse } from '@/utils/errorHandler';

interface RegisterResponse {
  status: boolean;
  message: string;
  data: string;
}

export const useRegister = () => {
  return useMutation<RegisterResponse, AxiosError<BackendErrorResponse>, RegisterFormInputs>({
    mutationFn: registerApi,
  });
};
