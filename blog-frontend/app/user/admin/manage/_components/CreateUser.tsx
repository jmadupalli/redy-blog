"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ApiError } from "@/app/_providers/api/apiUtil";
import { useCreateUserMutation } from "@/app/_providers/api/userApi";
import Loading from "@/app/user/dash/_components/Loading";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const inititalUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function CreateUserDialog() {
  const [formData, setFormData] = useState(inititalUserInfo);
  const [createUserMutation, createUserResult] = useCreateUserMutation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserMutation(formData);
  };

  useEffect(() => {
    if (createUserResult.isError) {
      const error: { data: ApiError } = createUserResult.error as {
        data: ApiError;
      };
      toast.error(error.data.message);
      return;
    }

    if (createUserResult.isSuccess) {
      setFormData(() => inititalUserInfo);
      toast.success("User created successfully");
    }
  }, [createUserResult]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline px-3 py-1 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50">
          Create User
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-50">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>Create a new user here.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="firstname" className="text-sm text-right">
                First name
              </label>
              <input
                id="firstname"
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900 col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="lastname" className="text-sm text-right">
                Last name
              </label>
              <input
                id="lastname"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900 col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-sm text-right">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900 col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="password" className="text-sm text-right">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900 col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {createUserResult.isLoading ? (
              <Loading />
            ) : (
              <button
                className="inline px-3 py-1 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50"
                type="submit"
              >
                Submit
              </button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
