import type {
  ChangePasswordData,
  ChangePasswordResponse,
  GetUsersOptions,
  UserPaginationResult,
} from '@/types/api';
import type { IUser } from '@/types/user';
import type { UpdateUserFormInputs } from '@/validators/userValidator';

import { axiosInstance } from './axiosInstance';

export const changePasswordApi = async (
  data: ChangePasswordData,
): Promise<ChangePasswordResponse> => {
  const res = await axiosInstance.patch('/users/me/password', data);
  return res.data;
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

export const updateUserApi = async (payload: UpdateUserFormInputs, id?: string): Promise<IUser> => {
  const url = id ? `/users/${id}` : '/users/me';
  const res = await axiosInstance.patch(url, payload);
  return res.data.data;
};
