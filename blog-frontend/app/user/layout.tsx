import React from "react";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import { Providers } from "../_providers/providers";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "redy-blog - Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="grow p-6 bg-gray-100 text-gray-800 w-full">
          {children}
        </div>
        <Toaster position="top-center" richColors />
        <Footer />{" "}
      </div>
    </>
  );
}
