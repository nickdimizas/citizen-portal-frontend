import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';

import type { GetUsersOptions, UserPaginationResult } from '@/types/api';
import { getAllUsersApi } from '@/apis/userApi';
import type { BackendErrorResponse } from '@/utils/errorHandler';
import { setUsers } from '@/store/usersSlice';

export const useGetUsers = (options?: GetUsersOptions) => {
  const dispatch = useDispatch();

  const query = useQuery<UserPaginationResult, AxiosError<BackendErrorResponse>>({
    queryKey: ['users', options],
    queryFn: () => getAllUsersApi(options),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (query.data?.users) {
      dispatch(setUsers(query.data.users));
    }
  }, [query.data, dispatch]);

  return query;
};
