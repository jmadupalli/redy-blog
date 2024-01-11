"use client";
import { ApiError, onBoard } from "@/app/_providers/api/apiUtil";
import * as Switch from "@radix-ui/react-switch";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const initialSettings = {
  siteName: "",
  siteCaption: "",
  pageSize: 5,
  showLogin: true,
};
const initialUserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function OnBoardForm() {
  const [formData, setFormData] = useState(initialSettings);
  const [userData, setUserData] = useState(initialUserData);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, user = false) => {
    const { name, value } = e.target;

    if (!user) setFormData((prev) => ({ ...prev, [name]: value }));
    else setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChecked = (val: boolean) => {
    setFormData((prev) => ({ ...prev, showLogin: val }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await onBoard({ ...formData, userDTO: userData });
    if (response && response.status == 200) {
      toast.success("Onboarding successful");
      router.refresh();
    } else {
      const error: ApiError = await response.json();
      toast.error(error.message);
    }
    return;
  };

  return (
    <>
      <section className="p-6 bg-gray-100 text-gray-900">
        <form
          className="container flex flex-col mx-auto space-y-12"
          onSubmit={handleSubmit}
        >
          <div className="w-fit font-semibold text-xl">
            Create your redy blog!
          </div>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Site Settings</p>
              <p className="text-xs">Setup Site Settings here.</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="siteName" className="text-sm">
                  Site name
                </label>
                <input
                  id="siteName"
                  name="siteName"
                  type="text"
                  placeholder="Site name"
                  value={formData.siteName}
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="siteCaption" className="text-sm">
                  Site Caption
                </label>
                <input
                  id="siteCaption"
                  name="siteCaption"
                  type="text"
                  placeholder="Site Caption"
                  value={formData.siteCaption}
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="pageSize" className="text-sm">
                  Posts per page
                </label>
                <input
                  id="pageSize"
                  name="pageSize"
                  type="number"
                  placeholder="Posts per page"
                  value={formData.pageSize}
                  onChange={handleChange}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>

              <div className="col-span-full sm:col-span-3 text-left p-6">
                <label htmlFor="showLogin" className="text-sm mr-3">
                  Show Login Button:
                </label>
                <Switch.Root
                  className="mt-2 bg-gray-300 w-[38px] h-[20px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-red-600 outline-none cursor-default"
                  id="showLogin"
                  name="showLogin"
                  onCheckedChange={handleChecked}
                  checked={formData.showLogin}
                >
                  <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                </Switch.Root>
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Admin Credentials</p>
              <p className="text-xs">Setup your admin login here.</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="firstName" className="text-sm">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={userData.firstName}
                  onChange={(e) => handleChange(e, true)}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastName" className="text-sm">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={userData.lastName}
                  onChange={(e) => handleChange(e, true)}
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
                  name="email"
                  type="email"
                  placeholder="Admin email"
                  value={userData.email}
                  onChange={(e) => handleChange(e, true)}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Admin Password"
                  value={userData.password}
                  onChange={(e) => handleChange(e, true)}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-300 text-gray-900"
                  required
                />
              </div>
            </div>
          </fieldset>
          <div className="m-auto">
            <button
              type="submit"
              className=" mt-2 px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
