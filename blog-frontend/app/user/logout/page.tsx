"use client";
import { logoutUser } from "@/app/_providers/api/apiUtil";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const uiLogout = () => {
    localStorage.clear();
    router.push("/user/login");
  };
  useEffect(() => {
    logoutUser()
      .then(() => {
        uiLogout();
      })
      .catch((err) => {
        uiLogout();
      });
  }, [router]);
  return (
    <>
      <div className="text-center">Logging out...</div>
    </>
  );
}
