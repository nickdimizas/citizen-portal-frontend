import type { LoginFormInputs, RegisterFormInputs } from '@/validators/authValidator';

import { axiosInstance } from './axiosInstance';

interface LoginResponse {
  status: boolean;
  message: string;
}

interface RegisterResponse {
  status: boolean;
  message: string;
  data: string;
}

export const loginApi = async (data: LoginFormInputs): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>('/login', data);
  return res.data;
};

export const registerApi = async (data: RegisterFormInputs): Promise<RegisterResponse> => {
  const res = await axiosInstance.post<RegisterResponse>('/register', data);
  return res.data;
};
