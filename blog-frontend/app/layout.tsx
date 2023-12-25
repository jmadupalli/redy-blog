import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./_providers/providers";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "redy-blog",
  description: "Blog App with NextJS and SpringBoot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="grow p-3 bg-gray-100 text-gray-800 w-full">
              {children}
            </div>
            <Toaster position="top-center" richColors />
            <Footer />{" "}
          </div>
        </Providers>
      </body>
    </html>
  );
}
