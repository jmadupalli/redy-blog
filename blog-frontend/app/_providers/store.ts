"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { blogApi } from "./api/blogApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
