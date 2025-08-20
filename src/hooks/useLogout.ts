import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';

import { logoutApi } from '@/apis/authApi';
import { logout } from '@/store/authSlice';
import { clearUser } from '@/store/userSlice';
import type { BackendErrorResponse } from '@/utils/errorHandler';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<void, AxiosError<BackendErrorResponse>>({
    mutationFn: logoutApi,
    onSuccess: () => {
      // Update state and redirect
      dispatch(logout());
      dispatch(clearUser());
      navigate('/login');
    },
    onError: (error) => {
      console.error('Logout failed', error);
    },
  });
};
