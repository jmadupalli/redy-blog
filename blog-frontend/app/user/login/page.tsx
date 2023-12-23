"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { loginUser, ApiError } from "../../_api/apiUtils";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const response = (await loginUser(formData).catch((e: ApiError) => {
      console.error(e.response?.data.message);
    })) as AxiosResponse;
    if (response && response.status == 200) {
      localStorage &&
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      router.push("/user/dash");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 mx-auto text-gray-800">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
            required
          />
          <div className="flex justify-end text-xs text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm text-gray-50 bg-red-600"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
