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
  role: 'admin' | 'employee' | 'citizen';
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: Address;
  ssn: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type { Address, IUser };
