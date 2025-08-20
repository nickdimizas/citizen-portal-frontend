interface LoginResponse {
  status: boolean;
  message: string;
}

interface RegisterResponse {
  status: boolean;
  message: string;
  data: string;
}

export type { LoginResponse, RegisterResponse };
