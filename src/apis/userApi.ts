import type { IUser } from '@/store/userSlice';

import { axiosInstance } from './axiosInstance';

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  status: boolean;
  message: string;
}

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

export const getAllUsersApi = async (): Promise<IUser[]> => {
  const res = await axiosInstance.get('/users');
  return res.data.data;
};
