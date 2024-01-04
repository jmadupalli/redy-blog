import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/users";

export type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type InitialUserInfo = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  newPassword?: string;
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["user", "users"],
  endpoints: (builder) => ({
    getUser: builder.query<UserInfo, void>({
      query: () => "/",
      providesTags: ["user"],
    }),
    updateUser: builder.mutation<void, { id: number; patch: InitialUserInfo }>({
      query: ({ id, patch }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = usersApi;
