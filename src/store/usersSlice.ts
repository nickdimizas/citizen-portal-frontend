import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IUser } from '@/types/user';

interface UsersState {
  usersData: IUser[];
}

const initialState: UsersState = {
  usersData: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.usersData = action.payload;
    },
    addUsers: (state, action: PayloadAction<IUser>) => {
      state.usersData.push(action.payload);
    },
    updateUsers: (state, action: PayloadAction<IUser>) => {
      const index = state.usersData.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.usersData[index] = { ...state.usersData[index], ...action.payload };
      }
    },
    removeUsers: (state, action: PayloadAction<string>) => {
      state.usersData = state.usersData.filter((u) => u.id !== action.payload);
    },
    clearUsers: (state) => {
      state.usersData = [];
    },
  },
});

export const { setUsers, addUsers, updateUsers, removeUsers, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
