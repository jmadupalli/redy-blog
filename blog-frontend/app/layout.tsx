import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./_providers/providers";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import { fetchSettings } from "./_providers/api/apiUtil";
import { ToOnboard } from "./_providers/api/userApi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "redy-blog",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings: ToOnboard = await fetchSettings();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen flex-col">
            {!settings || settings.toOnBoard ? (
              <Header settings={undefined} />
            ) : (
              <Header settings={settings.settings} />
            )}
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
