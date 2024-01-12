import Post from "@/app/_components/Post";
import { API_URL_SERVER } from "@/app/_providers/api/apiUtil";
import { BlogPost } from "@/app/_providers/api/blogApi";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string; title: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: BlogPost = await fetch(API_URL_SERVER + `/posts/${params.id}`, {
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .catch(() => notFound());

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: `${post.user?.firstName} ${post.user?.lastName}` }],
    openGraph: {
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { id: string; title: string };
}) {
  const postId = parseInt(params.id);
  const response = await fetch(API_URL_SERVER + `/posts/${postId}`, {
    next: { revalidate: 3600 },
  }).catch(() => notFound());
  const post: BlogPost = await response.json();
  if (response.status != 200) return notFound();
  return (
    <>
      <Post post={post} />
    </>
  );
}
