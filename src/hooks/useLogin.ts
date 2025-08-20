import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';

import type { LoginFormInputs } from '@/validators/userValidator';
import { loginApi } from '@/apis/authApi';
import { setAuthenticated } from '@/store/authSlice';
import type { BackendErrorResponse } from '@/utils/errorHandler';
import type { LoginResponse } from '@/types/api';

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, AxiosError<BackendErrorResponse>, LoginFormInputs>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.status) {
        dispatch(setAuthenticated(true));
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
