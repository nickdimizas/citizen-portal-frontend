import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import type { LoginFormInputs } from '@/validators/authValidators';
import { loginApi } from '@/apis/auth';
import { setAuthenticated } from '@/store/authSlice';

interface LoginResponse {
  status: boolean;
  message: string;
}

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, Error, LoginFormInputs>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data.status) {
        dispatch(setAuthenticated(true));
      }
    },
    onError: (error) => {
      alert('Unable to connect. Please try again later.');
      console.error(error);
    },
  });
};
