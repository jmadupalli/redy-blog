import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./apiUtil";

const BASE_URL = API_URL + "/users";

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
    baseUrl: BASE_URL,
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
      query: (id) => `/admin/${id}`,
      providesTags: (res, err, id) => [{ type: "user", id }],
    }),
    listUsers: builder.query<UserInfo[], void>({
      query: () => "/admin/list",
      providesTags: ["users"],
    }),
    getSettings: builder.query<ToOnboard, void>({
      query: () => "/admin/siteSettings",
      providesTags: ["settings"],
    }),
    updateSettings: builder.mutation<void, SiteSettings>({
      query: (settings) => ({
        url: "/admin/siteSettings",
        method: "PUT",
        body: settings,
      }),
      invalidatesTags: ["settings"],
    }),
    createUser: builder.mutation<void, InitialUserInfo>({
      query: (userInfo) => ({
        url: "/admin/create",
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
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    makeAdmin: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/makeAdmin/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    removeAdmin: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/removeAdmin/${id}`,
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
