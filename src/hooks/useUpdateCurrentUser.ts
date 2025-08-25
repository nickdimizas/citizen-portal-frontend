import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { updateUserApi } from '@/apis/userApi';
import type { UpdateUserFormInputs } from '@/validators/userValidator';
import type { BackendErrorResponse } from '@/utils/errorHandler';
import type { IUser } from '@/types/user';

export const useUpdateCurrentUser = () => {
  const queryClient = useQueryClient();

  return useMutation<IUser, AxiosError<BackendErrorResponse>, UpdateUserFormInputs>({
    mutationFn: (payload) => updateUserApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error('Failed to update self', error);
    },
  });
};
