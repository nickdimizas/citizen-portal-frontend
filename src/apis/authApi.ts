import type { LoginFormInputs, RegisterFormInputs } from '@/validators/userValidator';
import type { LoginResponse, RegisterResponse } from '@/types/api';

import { axiosInstance } from './axiosInstance';

export const loginApi = async (data: LoginFormInputs): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>('/login', data);
  return res.data;
};

export const registerApi = async (data: RegisterFormInputs): Promise<RegisterResponse> => {
  const res = await axiosInstance.post<RegisterResponse>('/register', data);
  return res.data;
};

export const logoutApi = async (): Promise<void> =>
  axiosInstance.post('/logout', { withCredentials: true });
