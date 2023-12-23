"use client";
export default function DashboardPage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") ?? "");
  return <>Welcome, {userInfo.firstName}</>;
}
