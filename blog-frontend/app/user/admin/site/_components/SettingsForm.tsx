"use client";
import { ApiError } from "@/app/_providers/api/apiUtil";
import {
  SiteSettings,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/app/_providers/api/userApi";
import Loading from "@/app/user/dash/_components/Loading";
import * as Switch from "@radix-ui/react-switch";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsForm() {
  const [formData, setFormData] = useState<SiteSettings>({
    siteName: "",
    siteCaption: "",
    pageSize: 5,
    showLogin: true,
  });
  const [updateSettings, result] = useUpdateSettingsMutation();

  const settings = useGetSettingsQuery();

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChecked = (val: boolean) => {
    setFormData((prev) => ({ ...prev, showLogin: val }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSettings(formData);
  };

  useEffect(() => {
    if (settings.isSuccess && settings.data)
      setFormData(() => settings.data?.settings);
  }, [settings]);

  useEffect(() => {
    if (result.isError) {
      const error: { data: ApiError } = result.error as { data: ApiError };
      toast.error(error.data.message);
      return;
    }

    if (result.isSuccess) {
      toast.success("Settings updated successfully");
      router.push("/user/dash");
    }
  }, [result, router]);

  return (
    <>
      {settings.isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Site Settings</p>
              <p className="text-xs">Update Site Settings here.</p>
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
          <div className="m-auto">
            {result.isLoading ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className=" mt-2 px-4 py-2 font-semibold rounded bg-red-600 hover:bg-red-500 text-gray-50"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
}
