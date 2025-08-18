import type { IUser } from '@/store/userSlice';

import { axiosInstance } from './axiosInstance';

export const getMyProfileApi = async (): Promise<IUser> => {
  const res = await axiosInstance.get('/users/me');
  return res.data.data;
};
