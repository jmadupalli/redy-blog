import { BlogPost, useDeletePostMutation } from "@/app/_providers/api/blogApi";
import Loading from "./Loading";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function BlogRow({ post }: { post: BlogPost }) {
  const createdDate = new Date(post.createdAt);
  const updatedDate = new Date(post.updatedAt);

  const [deletePost, result] = useDeletePostMutation();

  useEffect(() => {
    if (result.isError) {
      toast.error("Failed to delete post");
      console.log(result.error);
      return;
    }
    if (result.isSuccess) toast.success("Post deleted successfully");
  }, [result]);

  const handleDelete = () => {
    deletePost(post.id);
  };

  return (
    <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
      <td className="p-3 max-w-xs">
        <p>{post.title}</p>
      </td>
      <td className="p-3 max-w-xs">
        <p>{post.description}</p>
      </td>
      <td className="p-3">
        <p>{createdDate.toLocaleDateString()}</p>
        <p className="text-gray-600">{createdDate.toLocaleTimeString()}</p>
      </td>
      <td className="p-3">
        <p>{updatedDate.toLocaleDateString()}</p>
        <p className="text-gray-600">{updatedDate.toLocaleTimeString()}</p>
      </td>
      <td className="p-3">
        <Link href={`dash/edit/${post.id}`}>
          <button className="px-3 py-1 font-semibold rounded-md bg-red-600 text-gray-50">
            <span>Edit</span>
          </button>
        </Link>

        {result.isLoading ? (
          <Loading />
        ) : (
          <button
            onClick={handleDelete}
            className="px-3 py-1 ml-2 font-semibold rounded-md bg-red-600 text-gray-50"
          >
            <span>Delete</span>
          </button>
        )}
      </td>
    </tr>
  );
}
