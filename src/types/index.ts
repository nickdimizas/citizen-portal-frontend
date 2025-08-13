export type TokenPayload = {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'employee' | 'citizen';
};
