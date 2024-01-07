"use client";
import { useGetUserQuery } from "@/app/_providers/api/userApi";
import Loading from "../dash/_components/Loading";

import EditUserForm from "../dash/_components/EditUserForm";

export default function SettingsPage() {
  const { data: user, isLoading } = useGetUserQuery();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !user ? (
        <div className="text-center">Something went wrong</div>
      ) : (
        <EditUserForm user={user} adminEdit={false} />
      )}
    </>
  );
}
