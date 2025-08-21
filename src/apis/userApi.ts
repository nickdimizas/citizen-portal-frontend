import type {
  ChangePasswordData,
  ChangePasswordResponse,
  GetUsersOptions,
  UserPaginationResult,
} from '@/types/api';
import type { IUser } from '@/types/user';

import { axiosInstance } from './axiosInstance';

export const changePasswordApi = async (
  data: ChangePasswordData,
): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.patch('/users/me/password', data);
  return response.data;
};

export const getMyProfileApi = async (): Promise<IUser> => {
  const res = await axiosInstance.get('/users/me');
  return res.data.data;
};

export const getUserByIdApi = async (id: string): Promise<IUser> => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data.data;
};

export const getAllUsersApi = async (options?: GetUsersOptions): Promise<UserPaginationResult> => {
  const res = await axiosInstance.get('/users', { params: options });
  return res.data.payload;
};
