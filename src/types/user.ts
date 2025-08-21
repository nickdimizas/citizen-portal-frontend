interface Address {
  city: string;
  street: string;
  number: string;
  postcode: string;
}

interface IUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: Address;
  ssn: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

type UserRole = 'admin' | 'employee' | 'citizen';

export type { Address, IUser, UserRole };
