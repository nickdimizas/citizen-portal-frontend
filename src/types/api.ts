import type { IUser } from './user';

interface LoginResponse {
  status: boolean;
  message: string;
}

interface RegisterResponse {
  status: boolean;
  message: string;
  data: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  status: boolean;
  message: string;
}

interface GetUsersOptions {
  roleFilter?: string[];
  active?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

interface UserPaginationResult {
  users: IUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export type {
  LoginResponse,
  RegisterResponse,
  GetUsersOptions,
  UserPaginationResult,
  ChangePasswordData,
  ChangePasswordResponse,
};
