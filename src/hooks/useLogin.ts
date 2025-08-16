import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';

import type { LoginFormInputs } from '@/validators/authValidators';
import { loginApi } from '@/apis/auth';
import { setAuthenticated } from '@/store/authSlice';

interface LoginResponse {
  status: boolean;
  message: string;
}

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, AxiosError, LoginFormInputs>({
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
