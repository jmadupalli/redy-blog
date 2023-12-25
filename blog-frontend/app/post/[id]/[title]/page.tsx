import Post from "@/app/_components/Post";
import { API_URL } from "@/app/_providers/api/apiUtil";
import { BlogPost } from "@/app/_providers/api/blogApi";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string; title: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: BlogPost = await fetch(API_URL + `/posts/${params.id}`).then(
    (res) => res.json()
  );

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
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
  const response = await fetch(API_URL + `/posts/${params.id}`);
  const post: BlogPost = await response.json();
  if (response.status != 200) return notFound();
  return (
    <>
      <Post post={post} />
    </>
  );
}