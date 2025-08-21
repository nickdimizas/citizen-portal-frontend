import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { GetUsersOptions, UserPaginationResult } from '@/types/api';
import { getAllUsersApi } from '@/apis/userApi';
import type { BackendErrorResponse } from '@/utils/errorHandler';

export const useUsers = (options?: GetUsersOptions) => {
  return useQuery<UserPaginationResult, AxiosError<BackendErrorResponse>>({
    queryKey: ['users', options],
    queryFn: () => getAllUsersApi(options),
  });
};
