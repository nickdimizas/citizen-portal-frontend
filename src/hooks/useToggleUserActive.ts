import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { toggleUserActiveApi } from '@/apis/userApi';
import type { ToggleUserActiveResponse } from '@/types/api';
import type { IUser } from '@/types/user';
import { extractErrorMessage, type BackendErrorResponse } from '@/utils/errorHandler';

export const useToggleUserActive = () => {
  const queryClient = useQueryClient();

  return useMutation<ToggleUserActiveResponse, AxiosError<BackendErrorResponse>, string>({
    mutationFn: (id: string) => toggleUserActiveApi(id),
    onSuccess: (data) => {
      queryClient.setQueryData<IUser[]>(['users'], (oldUsers) =>
        oldUsers?.map((user) =>
          user.id === data.data.id ? { ...user, active: data.data.active } : user,
        ),
      );

      queryClient.setQueryData<IUser>(['user', data.data.id], (old) =>
        old ? { ...old, active: data.data.active } : old,
      );

      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      console.error('Failed to toggle user active status:', message);
    },
  });
};
