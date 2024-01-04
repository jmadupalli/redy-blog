"use client";
import {
  InitialUserInfo,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/app/_providers/api/userApi";
import Loading from "../dash/_components/Loading";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/_providers/api/apiUtil";

const inititalUserInfo: InitialUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  newPassword: "",
};

export default function SettingsPage() {
  const { data: user, isLoading } = useGetUserQuery();
  const [formData, setFormData] = useState(inititalUserInfo);
  const [updatedContent, setUpdatedContent] = useState<InitialUserInfo>({});
  const [updatePost, result] = useUpdateUserMutation();

  const router = useRouter();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...user }));
  }, [user]);

  useEffect(() => {
    if (result.isError) {
      const error: { data: ApiError } = result.error as { data: ApiError };
      toast.error(error.data.message);
      return;
    }

    if (result.isSuccess) {
      toast.success("Profile updated successfully");
      router.push("/user/dash");
    }
  }, [result, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setUpdatedContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("Something went wrong");
      return;
    }

    if (updatedContent.firstName == user?.firstName)
      delete updatedContent.firstName;
    if (updatedContent.lastName == user?.lastName)
      delete updatedContent.lastName;
    if (updatedContent.email == user?.email) delete updatedContent.email;

    if (
      updatedContent.password &&
      (!updatedContent.newPassword ||
        updatedContent.password.trim().length == 0)
    ) {
      toast.error("New password cannot be empty");
      return;
    }

    if (updatedContent.newPassword && !updatedContent.password) {
      toast.error("Current password cannot be empty");
      return;
    }
    if (Object.keys(updatedContent).length == 0) return;

    updatePost({ id: user?.id, patch: updatedContent });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="p-6 bg-gray-100 text-gray-900">
          <form
            onSubmit={handleSubmit}
            className="container flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-medium">Personal Inormation</p>
                <p className="text-xs">
                  Update your personal information here.
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="firstname" className="text-sm">
                    First name
                  </label>
                  <input
                    id="firstname"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                    required
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="lastname" className="text-sm">
                    Last name
                  </label>
                  <input
                    id="lastname"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                    required
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                    required
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-medium">Password</p>
                <p className="text-xs">Update password here.</p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="password" className="text-sm">
                    Current Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Current Password"
                    className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  />
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="newPassword" className="text-sm">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
              <div className="col-span-full text-center">
                {result.isLoading ? (
                  <Loading />
                ) : (
                  <button
                    type="submit"
                    className=" mt-2 px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50"
                  >
                    Update Profile
                  </button>
                )}
              </div>
            </fieldset>
          </form>
        </section>
      )}
    </>
  );
}
