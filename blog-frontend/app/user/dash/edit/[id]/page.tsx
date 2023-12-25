"use client";

import { useGetPostQuery } from "@/app/_providers/api/blogApi";
import Loading from "../../_components/Loading";
import PostForm from "../../_components/PostForm";

export default function EditPage({ params }: { params: { id: number } }) {
  const post = useGetPostQuery(params.id);
  return <>{post.isLoading ? <Loading /> : <PostForm post={post.data} />}</>;
}
