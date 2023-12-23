"use client";

import { RootState } from "@/app/_providers/store";
import { useSelector } from "react-redux";
import { BlogTable } from "./_components/BlogTable";

export default function DashboardPage() {
  const userState = useSelector((state: RootState) => state.user);
  return (
    <>
      <div className="container text-center w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <h2>
          Welcome, {userState?.firstName}! This is where you manage your blogs
          with ease.
        </h2>
      </div>
      <div className="container text-center mt-2 w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <BlogTable />
      </div>
    </>
  );
}
