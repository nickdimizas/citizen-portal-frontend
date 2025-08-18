import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface IUser {
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

interface UserState {
  userData: IUser | null;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.userData = action.payload;
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
