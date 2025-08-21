import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { IUser } from '@/types/user';
import type { BackendErrorResponse } from '@/utils/errorHandler';
import { getUserByIdApi } from '@/apis/userApi';

export const useUserById = (id: string) => {
  return useQuery<IUser, AxiosError<BackendErrorResponse>>({
    queryKey: ['user', id],
    queryFn: () => getUserByIdApi(id),
    enabled: !!id,
  });
};
