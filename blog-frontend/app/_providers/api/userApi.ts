import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/users";

export type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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
    listUsers: builder.query<UserInfo[], void>({
      query: () => "/list",
      providesTags: ["users"],
    }),
    updateUser: builder.mutation<void, { id: number; patch: InitialUserInfo }>({
      query: ({ id, patch }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["user", "users"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    makeAdmin: builder.mutation<void, number>({
      query: (id) => ({
        url: `/makeAdmin/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    removeAdmin: builder.mutation<void, number>({
      query: (id) => ({
        url: `/removeAdmin/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useListUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} = usersApi;
