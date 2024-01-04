"use client";
import { RootState } from "@/app/_providers/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export default function ManageUsers() {
  const userState = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (userState.role != "ROLE_ADMIN") router.push("/user/dash");
  }, [userState, router]);
  return (
    <>
      <div className="container text-center w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <h2>Manage Users</h2>
      </div>
      <div className="container text-center mt-2 w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50"></div>
    </>
  );
}
