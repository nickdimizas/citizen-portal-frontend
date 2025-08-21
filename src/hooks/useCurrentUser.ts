import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { AxiosError } from 'axios';

import { setUser } from '@/store/userSlice';
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
  }, [data, dispatch]);

  return { data, error, isLoading };
};
