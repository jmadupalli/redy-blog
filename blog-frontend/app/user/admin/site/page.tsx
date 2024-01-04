"use client";

import { RootState } from "@/app/_providers/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SiteAdmin() {
  const userState = useSelector((state: RootState) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (userState.role != "ROLE_ADMIN") router.push("/user/dash");
  }, [userState, router]);
  return <></>;
}
