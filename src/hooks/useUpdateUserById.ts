import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';

import { updateUsers } from '@/store/usersSlice';
import type { IUser } from '@/types/user';
import { updateUserApi } from '@/apis/userApi';
import type { UpdateUserFormInputs } from '@/validators/userValidator';
import { extractErrorMessage, type BackendErrorResponse } from '@/utils/errorHandler';

export const useUpdateUserById = (id: string) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<IUser, AxiosError<BackendErrorResponse>, UpdateUserFormInputs>({
    mutationFn: (payload) => updateUserApi(payload, id),
    onSuccess: (data) => {
      dispatch(updateUsers(data));

      queryClient.setQueryData(['user', id], data);

      const usersCache = queryClient.getQueryData<IUser[]>(['users']);
      if (usersCache) {
        queryClient.setQueryData(
          ['users'],
          usersCache.map((u) => (u.id === data.id ? data : u)),
        );
      }
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      console.error(`Failed to update user ${id}:`, message);
    },
  });
};
