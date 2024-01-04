"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  firstName: string | null;
  lastName: string | null;
  role: string | null;
};

const initialState: UserState = { firstName: null, lastName: null, role: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<UserState>) => ({ ...action.payload }),
    logout: () => ({ firstName: null, lastName: null, role: null }),
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
