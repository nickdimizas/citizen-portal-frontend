import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IUser } from '@/types/user';

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
