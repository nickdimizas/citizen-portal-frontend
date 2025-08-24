import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';

import type { IUser } from '@/types/user';
import type { BackendErrorResponse } from '@/utils/errorHandler';
import { getUserByIdApi } from '@/apis/userApi';
import { updateUsers } from '@/store/usersSlice';
import type { RootState } from '@/store/store';

export const useGetUserById = (id: string) => {
  const dispatch = useDispatch();

  const existingUser = useSelector((state: RootState) =>
    state.users.usersData.find((user) => user.id === id),
  );

  const query = useQuery<IUser, AxiosError<BackendErrorResponse>>({
    queryKey: ['user', id],
    queryFn: () => getUserByIdApi(id),
    enabled: !!id,
    initialData: existingUser,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(updateUsers(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};
