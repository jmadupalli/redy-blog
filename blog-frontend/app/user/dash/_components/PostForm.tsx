"use client";

import { MDXEditorMethods } from "@mdxeditor/editor";
import React, {
  ChangeEvent,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { ForwardRefEditor } from "../_components/editor/Editor";
import {
  BlogPost,
  useCreateOrUpdatePostMutation,
} from "@/app/_providers/api/blogApi";
import { toast } from "sonner";
import Loading from "../_components/Loading";
import { useRouter } from "next/navigation";

export default function PostForm({ post }: { post: BlogPost | undefined }) {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [createOrUpdatePost, result] = useCreateOrUpdatePostMutation();
  const [formData, setFormData] = useState({
    title: post?.title ?? "",
    description: post?.description ?? "",
    keywords: post?.keywords ?? "",
  });

  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = editorRef.current?.getMarkdown();
    if (!content || content.trim().length == 0) {
      toast.error("Content cannot be empty.");
      return;
    }
    const nKeywords = formData.keywords.split(",").length;
    if (nKeywords > 3) {
      toast.error("Post cannot have more than 3 keywords");
      return;
    }
    createOrUpdatePost({
      id: post ? post.id : undefined,
      post: { content, ...formData },
    });
  };

  useEffect(() => {
    if (result.isError) {
      toast.error(!post ? "Failed to create post" : "Failed to update post");
      console.log(result.error);
      return;
    }
    if (result.isSuccess) {
      toast.success(
        !post ? "Post created successfully" : "Post updated successfully"
      );
      router.push("/user/dash");
    }
  }, [result, router, post]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container text-center w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
          <fieldset className="grid grid-cols-4 gap-3 rounded-md bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="text-xl">New Blog</p>
              <p className="text-xs">Blog post details</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full">
                <label htmlFor="title" className="text-sm">
                  Post Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Post Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="description" className="text-sm">
                  Post Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  name="description"
                  onChange={handleChange}
                  placeholder="Post Description"
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                ></textarea>
              </div>
              <div className="col-span-full">
                <label htmlFor="website" className="text-sm">
                  Post Keywords (comma-separated, max 3)
                </label>
                <input
                  id="keywords"
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="Post tags/keywords"
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="container mt-2 w-10/12 min-h-96 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
          <Suspense fallback={null}>
            <ForwardRefEditor
              ref={editorRef}
              markdown={post?.content ?? ""}
              placeholder="Your Post Content here"
            />
          </Suspense>
          <div className="text-center">
            {!result.isLoading ? (
              <button
                type="submit"
                className="mt-2 px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50"
              >
                Submit
              </button>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </form>
    </>
  );
}
