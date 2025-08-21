import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { IUser } from '@/types/user';

interface UsersState {
  users: IUser[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    updateUserById: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    removeUserById: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setUsers, addUser, updateUserById, removeUserById, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
