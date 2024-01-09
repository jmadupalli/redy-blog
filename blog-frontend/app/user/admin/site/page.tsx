"use client";
import { useGetSettingsQuery } from "@/app/_providers/api/userApi";
import SettingsForm from "./_components/SettingsForm";
import Loading from "../../dash/_components/Loading";

export default function SiteSettings() {
  const settings = useGetSettingsQuery();

  return (
    <>
      <div className="container text-center w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <h2>Manage Site</h2>
      </div>
      <div className="container text-center mt-2 w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        {settings.isLoading ? (
          <Loading />
        ) : (
          settings.data && <SettingsForm settings={settings.data?.settings} />
        )}
      </div>
    </>
  );
}
