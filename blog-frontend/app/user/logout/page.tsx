"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    localStorage.clear();
    router.push("/user/login");
  }, [router]);
  return (
    <>
      <div className="text-center">Logging out...</div>
    </>
  );
}
