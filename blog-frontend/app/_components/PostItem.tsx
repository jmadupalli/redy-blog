import Link from "next/link";
import { BlogPost } from "../_providers/api/blogApi";

const makeTitlePretty = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export default function PostItem({ post }: { post: BlogPost }) {
  return (
    <>
      <div className="container max-w-4xl px-10 py-6 mx-auto mb-3 rounded-lg shadow-sm bg-gray-50">
        <div className="flex items-center justify-between md:text-sm text-xs">
          <div className="text-gray-600 ">
            {new Date(post.createdAt).toDateString()}
          </div>

          <div className="justify-right hidden md:flex">
            {post.keywords.split(",").map((keyword, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded bg-red-600 text-gray-50 mr-1"
              >
                #{keyword.trim()}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <Link
            href={`/post/${post.id}/${makeTitlePretty(post.title)}`}
            className="text-2xl font-bold hover:underline"
          >
            {post.title}
          </Link>
          <p className="mt-2">{post.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Link
            href={`/post/${post.id}/${makeTitlePretty(post.title)}`}
            className="hover:underline text-red-600"
          >
            Read more
          </Link>
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
