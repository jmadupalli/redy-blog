import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/posts";

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
  tagTypes: ["d_posts", "post"],
  endpoints: (builder) => ({
    getUserPostsQuery: builder.query<BlogPost[], void>({
      query: () => "/user",
      providesTags: ["d_posts"],
    }),
    getPost: builder.query<BlogPost, number>({
      query: (id) => `/${id}`,
      providesTags: (res, err, id) => [{ type: "post", id }],
    }),
    createOrUpdatePost: builder.mutation<
      void,
      { id: number | undefined; post: Post }
    >({
      query: ({ id, post }) => ({
        url: id ? `/${id}` : "/",
        method: id ? "PUT" : "POST",
        body: post,
      }),
      invalidatesTags: (res, err, arg) => [
        { type: "post", id: arg.id },
        "d_posts",
      ],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["d_posts"],
    }),
  }),
});

export const {
  useGetUserPostsQueryQuery,
  useGetPostQuery,
  useCreateOrUpdatePostMutation,
  useDeletePostMutation,
} = blogApi;
