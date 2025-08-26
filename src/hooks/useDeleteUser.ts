import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { deleteUserApi } from '@/apis/userApi';
import type { DeleteUserResponse } from '@/types/api';
import type { IUser } from '@/types/user';
import { extractErrorMessage, type BackendErrorResponse } from '@/utils/errorHandler';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteUserResponse, AxiosError<BackendErrorResponse>, string>({
    mutationFn: (id: string) => deleteUserApi(id),

    onSuccess: (data) => {
      queryClient.setQueryData<IUser[]>(['users'], (oldUsers) =>
        oldUsers?.filter((user) => user.id !== data.data.id),
      );

      queryClient.invalidateQueries({ queryKey: ['user', data.data.id] });

      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },

    onError: (error) => {
      const message = extractErrorMessage(error);
      console.error('Failed to delete user:', message);
    },
  });
};
