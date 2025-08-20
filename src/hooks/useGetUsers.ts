import { useQuery } from '@tanstack/react-query';

import type { GetUsersOptions, UserPaginationResult } from '@/types/api';
import { getAllUsersApi } from '@/apis/userApi';

export const useUsers = (options?: GetUsersOptions) => {
  return useQuery<UserPaginationResult>({
    queryKey: ['users', options],
    queryFn: () => getAllUsersApi(options),
  });
};
