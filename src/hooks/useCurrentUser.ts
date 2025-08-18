import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { setUser, type IUser } from '@/store/userSlice';
import { getMyProfileApi } from '@/apis/userApi';

export const useUserProfile = () => {
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery<Partial<IUser>>({
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
