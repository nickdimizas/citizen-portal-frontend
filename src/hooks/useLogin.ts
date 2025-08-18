import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';

import type { LoginFormInputs } from '@/validators/authValidator';
import { loginApi } from '@/apis/authApi';
import { setAuthenticated } from '@/store/authSlice';
import type { BackendErrorResponse } from '@/utils/errorHandler';

interface LoginResponse {
  status: boolean;
  message: string;
}

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
