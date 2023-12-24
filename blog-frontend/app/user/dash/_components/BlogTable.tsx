"use client";

import { useGetUserPostsQueryQuery } from "@/app/_providers/api/blogApi";
import Link from "next/link";
import Loading from "./Loading";
import BlogRow from "./BlogRow";

export function BlogTable() {
  const posts = useGetUserPostsQueryQuery();
  return (
    <>
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <div className="grid grid-cols-2 w-full py-3">
          <h2 className="text-left inlne placeholder:mb-4 text-2xl font-semibold">
            Your blogs
          </h2>
          <div className="text-right">
            <Link href="dash/create">
              <button className="inline px-3 py-1 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50">
                Create Post
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          {posts.isLoading && <Loading />}
          {!posts.isLoading && (
            <table className="min-w-full text-xs">
              <thead className="bg-gray-300">
                <tr className="text-center">
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Updated At</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="max-h-full overflow-auto">
                {posts.data?.length == 0 ? (
                  <tr className="border-b text-center border-opacity-20 border-gray-300 bg-gray-50">
                    <td colSpan={5}>No posts found</td>
                  </tr>
                ) : (
                  posts.data?.map((post) => (
                    <BlogRow key={post.id} post={post} />
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
