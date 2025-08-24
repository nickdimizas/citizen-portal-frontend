import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';

import { updateUser } from '@/store/userSlice';
import type { IUser } from '@/types/user';
import { updateUserApi } from '@/apis/userApi';
import type { UpdateUserFormInputs } from '@/validators/userValidator';
import type { BackendErrorResponse } from '@/utils/errorHandler';

export const useUpdateCurrentUser = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<IUser, AxiosError<BackendErrorResponse>, UpdateUserFormInputs>({
    mutationFn: (payload) => updateUserApi(payload),
    onSuccess: (data) => {
      dispatch(updateUser(data));

      queryClient.setQueryData(['userProfile'], data);
    },
    onError: (error) => {
      console.error('Failed to update self', error);
    },
  });
};
