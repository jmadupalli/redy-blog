"use server";
import { API_URL } from "../_providers/api/apiUtil";
import { BlogPost } from "../_providers/api/blogApi";
import PostItem from "../_components/PostItem";
import { notFound } from "next/navigation";
import Link from "next/link";

type PageablePosts = {
  content: BlogPost[];
  totalPages: number;
};

export default async function PostsList({
  params,
}: {
  params?: { page: string };
}) {
  const PAGE = params?.page ? parseInt(params.page) : 1;
  const response = await fetch(API_URL + `/posts/?page=${PAGE - 1}`, {
    next: { revalidate: 60 },
  });
  const posts: PageablePosts = await response.json();
  if (response.status != 200 || posts.content.length == 0) return notFound();
  return (
    <>
      {posts.content.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <div className="mt-3 mb-3 flex items-center justify-center space-y-2 text-xs sm:space-y-0 sm:space-x-3">
        <span className="block">{`Page ${PAGE} of ${posts.totalPages}`}</span>
        <div className="space-x-1">
          {PAGE > 1 && (
            <Link href={`/${PAGE - 1 == 1 ? "" : PAGE - 1}`}>
              <button
                title="previous"
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
              >
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            </Link>
          )}
          {PAGE < posts.totalPages && (
            <Link href={`/${PAGE + 1}`}>
              <button
                title="next"
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow"
              >
                <svg
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
