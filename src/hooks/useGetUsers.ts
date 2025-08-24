import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import type { AxiosError } from 'axios';

import type { GetUsersOptions, UserPaginationResult } from '@/types/api';
import { getAllUsersApi } from '@/apis/userApi';
import type { BackendErrorResponse } from '@/utils/errorHandler';
import { setUsers } from '@/store/usersSlice';

export const useGetUsers = (options?: GetUsersOptions) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const query = useQuery<UserPaginationResult, AxiosError<BackendErrorResponse>>({
    queryKey: ['users', options],
    queryFn: () => getAllUsersApi(options),
  });

  if (query.data?.users) {
    dispatch(setUsers(query.data.users));
    queryClient.setQueryData(['users', options], query.data);
  }

  return query;
};
