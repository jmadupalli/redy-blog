import { MDXRemote } from "next-mdx-remote/rsc";
import { BlogPost } from "../_providers/api/blogApi";

export default async function Post({ post }: { post: BlogPost }) {
  const createdDate = new Date(post.createdAt);
  return (
    <>
      <article className="max-w-4xl mb-3 px-12 py-12 mx-auto space-y-12 bg-gray-50 rounded-2xl text-gray-900">
        <div className="w-full mx-auto space-y-4 text-center">
          <p className="text-xs font-semibold tracki uppercase">
            {post.keywords.split(",").map((keyword) => (
              <>#{keyword.trim()} </>
            ))}
          </p>
          <h1 className="text-4xl font-bold leadi md:text-5xl">{post.title}</h1>
          <p className="text-sm text-gray-600">
            by{" "}
            <span itemProp="name" className="underline text-red-600">
              {post.user?.firstName} {post.user?.lastName}
            </span>{" "}
            on{" "}
            <time dateTime={createdDate.toISOString()}>
              {createdDate.toDateString()}
            </time>
          </p>
        </div>
        <div className="text-gray-800 post-md-content">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </>
  );
}
