import type { LoginFormInputs } from '@/validators/authValidators';

import { axiosInstance } from './axiosInstance';

interface LoginResponse {
  status: boolean;
  message: string;
}

export const loginApi = async (data: LoginFormInputs): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>('/login', data);
  return res.data;
};
