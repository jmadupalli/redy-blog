"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  UserInfo,
  useDeleteUserMutation,
  useMakeAdminMutation,
  useRemoveAdminMutation,
  useUpdateUserMutation,
} from "@/app/_providers/api/userApi";
import Loading from "@/app/user/dash/_components/Loading";

import { ApiError } from "@/app/_providers/api/apiUtil";
import Link from "next/link";

export default function UserRow({ user }: { user: UserInfo }) {
  const [deleteUser, deleteResult] = useDeleteUserMutation();
  const [makeAdmin, makeAdminResult] = useMakeAdminMutation();
  const [removeAdmin, removeAdminResult] = useRemoveAdminMutation();

  const [formData, setFormData] = useState({ newPassword: "" });
  const [updateUser, updateUserResult] = useUpdateUserMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({ id: user.id, patch: formData });
  };

  useEffect(() => {
    if (updateUserResult.isError) {
      const error: { data: ApiError } = updateUserResult.error as {
        data: ApiError;
      };
      toast.error(error.data.message);
      return;
    }

    if (updateUserResult.isSuccess) {
      setFormData(() => ({ newPassword: "" }));
      toast.success("Password changed successfully");
    }
  }, [updateUserResult]);

  const handleDelete = () => {
    deleteUser(user.id);
  };

  const handleAdminToggle = () => {
    if (user.role == "ROLE_ADMIN") removeAdmin(user.id);
    else makeAdmin(user.id);
  };

  useEffect(() => {
    if (deleteResult.isError) {
      const error: { data: ApiError } = deleteResult.error as {
        data: ApiError;
      };
      toast.error(error.data.message);
      return;
    }

    if (deleteResult.isSuccess) toast.success("User deleted successfully");
  }, [deleteResult]);

  useEffect(() => {
    if (removeAdminResult.isError) {
      const error: { data: ApiError } = removeAdminResult.error as {
        data: ApiError;
      };
      toast.error(error.data.message);
      return;
    }
  }, [removeAdminResult]);

  return (
    <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
      <td className="p-3">
        <p>{user.id}</p>
      </td>
      <td className="p-3">
        <p>{user.firstName}</p>
      </td>
      <td className="p-3">
        <p>{user.lastName}</p>
      </td>
      <td className="p-3">
        <p>{user.email}</p>
      </td>
      <td className="p-3 text-center">
        <Link href={`edit-user/${user.id}`}>
          <button className="px-3 py-1 ml-2 font-semibold rounded-md bg-blue-600 text-gray-50">
            <span>Edit</span>
          </button>
        </Link>
        {deleteResult.isLoading ? (
          <Loading />
        ) : (
          <button
            onClick={handleDelete}
            className="px-3 py-1 ml-2 font-semibold rounded-md bg-red-600 text-gray-50"
          >
            <span>Delete</span>
          </button>
        )}

        {makeAdminResult.isLoading || removeAdminResult.isLoading ? (
          <Loading />
        ) : user.role == "ROLE_ADMIN" ? (
          <button
            onClick={handleAdminToggle}
            className="px-3 py-1 ml-2 font-semibold rounded-md bg-yellow-600 text-gray-50"
          >
            <span>Remove Admin</span>
          </button>
        ) : (
          <button
            onClick={handleAdminToggle}
            className="px-3 py-1 ml-2 font-semibold rounded-md bg-green-600 text-gray-50"
          >
            <span>Make Admin</span>
          </button>
        )}
      </td>
    </tr>
  );
}
