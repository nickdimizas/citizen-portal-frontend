import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { RegisterFormInputs } from '@/validators/userValidator';
import { registerApi } from '@/apis/authApi';
import type { BackendErrorResponse } from '@/utils/errorHandler';
import type { RegisterResponse } from '@/types/api';

export const useRegister = () => {
  return useMutation<RegisterResponse, AxiosError<BackendErrorResponse>, RegisterFormInputs>({
    mutationFn: registerApi,
  });
};
