import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

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

export type SiteSettings = {
  siteName: string;
  siteCaption: string;
  pageSize: number;
  showLogin: boolean;
};

export type ToOnboard = {
  settings: SiteSettings;
  toOnBoard: boolean;
};

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["user", "users", "settings"],
  endpoints: (builder) => ({
    getUser: builder.query<UserInfo, void>({
      query: () => "/",
      providesTags: ["user"],
    }),
    getUserById: builder.query<UserInfo, number>({
      query: (id) => `/${id}`,
      providesTags: (res, err, id) => [{ type: "user", id }],
    }),
    listUsers: builder.query<UserInfo[], void>({
      query: () => "/list",
      providesTags: ["users"],
    }),
    getSettings: builder.query<ToOnboard, void>({
      query: () => "/siteSettings",
      providesTags: ["settings"],
    }),
    updateSettings: builder.mutation<void, SiteSettings>({
      query: (settings) => ({
        url: "/siteSettings",
        method: "PUT",
        body: settings,
      }),
    }),
    createUser: builder.mutation<void, InitialUserInfo>({
      query: (userInfo) => ({
        url: "/create",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["users"],
    }),
    updateUser: builder.mutation<void, { id: number; patch: InitialUserInfo }>({
      query: ({ id, patch }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: patch,
      }),

      invalidatesTags: (res, err, arg) => [
        { type: "user", id: arg.id },
        "users",
      ],
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
  useGetUserByIdQuery,
  useListUsersQuery,
  useGetSettingsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useMakeAdminMutation,
  useUpdateSettingsMutation,
  useRemoveAdminMutation,
} = usersApi;
