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

export interface GetUsersOptions {
  roleFilter?: string[];
  active?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface UserPaginationResult {
  users: IUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
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

export const getAllUsersApi = async (options?: GetUsersOptions): Promise<UserPaginationResult> => {
  const res = await axiosInstance.get('/users', { params: options });
  return res.data.payload;
};
