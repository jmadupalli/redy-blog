import Link from "next/link";
import { BlogPost } from "../_providers/api/blogApi";

export default function PostItem({ post }: { post: BlogPost }) {
  return (
    <>
      <div className="container max-w-4xl px-10 py-6 mx-auto mb-3 rounded-lg shadow-sm bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {new Date(post.createdAt).toDateString()}
          </span>
          <div className="justify-right">
            {post.keywords.split(",").map((keyword, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded bg-red-600 text-gray-50 text-sm mr-1"
              >
                #{keyword.trim()}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <Link
            href={`/post/${post.id}/${post.title.replaceAll(" ", "-")}`}
            className="text-2xl font-bold hover:underline"
          >
            {post.title}
          </Link>
          <p className="mt-2">{post.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <a
            rel="noopener noreferrer"
            href="#"
            className="hover:underline text-red-600"
          >
            Read more
          </a>
          <div>
            <span className=" flex items-center text-gray-600">
              {`${post.user?.firstName} ${post.user?.lastName}`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
