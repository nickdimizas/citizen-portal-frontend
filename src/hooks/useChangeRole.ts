import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { changeUserRoleApi } from '@/apis/userApi';
import type { ChangeUserRoleResponse } from '@/types/api';
import type { IUser, UserRole } from '@/types/user';
import type { BackendErrorResponse } from '@/utils/errorHandler';

export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ChangeUserRoleResponse,
    AxiosError<BackendErrorResponse>,
    { id: string; role: UserRole }
  >({
    mutationFn: ({ id, role }) => changeUserRoleApi(id, role),

    onSuccess: (data) => {
      const updatedRole = data.data.role as UserRole;

      queryClient.setQueryData<IUser[]>(['users'], (oldUsers) =>
        oldUsers?.map((user) => (user.id === data.data.id ? { ...user, role: updatedRole } : user)),
      );

      queryClient.setQueryData<IUser>(['user', data.data.id], (old) =>
        old ? { ...old, role: updatedRole } : old,
      );

      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },

    onError: (error) => {
      console.error('Failed to change user role', error);
    },
  });
};
