import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { RegisterFormInputs } from '@/validators/authValidators';
import { registerApi } from '@/apis/auth';

interface RegisterResponse {
  status: boolean;
  message: string;
  data: string;
}

export const useRegister = () => {
  return useMutation<RegisterResponse, AxiosError, RegisterFormInputs>({
    mutationFn: registerApi,
  });
};
