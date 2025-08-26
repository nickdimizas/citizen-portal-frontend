import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { AxiosError } from 'axios';

import { clearUser, setUser } from '@/store/userSlice';
import type { IUser } from '@/types/user';
import { getMyProfileApi } from '@/apis/userApi';
import type { BackendErrorResponse } from '@/utils/errorHandler';

export const useCurrentUser = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery<IUser, AxiosError<BackendErrorResponse>>({
    queryKey: ['userProfile'],
    queryFn: getMyProfileApi,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }

    if (error?.response?.status === 401) {
      dispatch(clearUser());
      window.location.href = '/login';
    }
  }, [data, error, dispatch]);

  return { data, error, isLoading };
};
