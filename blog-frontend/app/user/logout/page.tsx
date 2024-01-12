"use client";
import { logoutUser } from "@/app/_providers/api/apiUtil";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    logoutUser()
      .then(() => {
        localStorage.clear();
        router.push("/user/login");
      })
      .catch((err) => {});
  }, [router]);
  return (
    <>
      <div className="text-center">Logging out...</div>
    </>
  );
}
