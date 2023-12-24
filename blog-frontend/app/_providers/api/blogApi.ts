import {
  MutationDefinition,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Post = {
  title: string;
  description: string;
  content: string;
  keywords: string;
};

export type BlogPost = {
  id: number;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
} & Post;

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["posts", "post"],
  endpoints: (builder) => ({
    getUserPostsQuery: builder.query<BlogPost[], void>({
      query: () => "/posts/user",
      providesTags: ["posts"],
    }),
    getPost: builder.query<BlogPost, number>({
      query: (id) => `/posts/${id}`,
    }),
    createOrUpdatePost: builder.mutation<
      void,
      { id: number | undefined; post: Post }
    >({
      query: ({ id, post }) => ({
        url: id ? `/posts/${id}` : "/posts/",
        method: id ? "PUT" : "POST",
        body: post,
      }),
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetUserPostsQueryQuery,
  useGetPostQuery,
  useCreateOrUpdatePostMutation,
  useDeletePostMutation,
} = blogApi;
