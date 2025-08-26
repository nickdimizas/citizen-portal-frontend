import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { createUser } from '@/apis/userApi';
import type { CreateUserFormInputs } from '@/validators/userValidator';
import { extractErrorMessage, type BackendErrorResponse } from '@/utils/errorHandler';
import type { CreateUserResponse } from '@/types/api';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateUserResponse, AxiosError<BackendErrorResponse>, CreateUserFormInputs>({
    mutationFn: (data) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      console.error('Failed to create user:', message);
    },
  });
};
