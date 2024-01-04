"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { blogApi } from "./api/blogApi";
import { usersApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
