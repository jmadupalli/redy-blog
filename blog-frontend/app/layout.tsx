import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./_providers/providers";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "sonner";
import { API_URL } from "./_providers/api/apiUtil";
import { ToOnboard } from "./_providers/api/userApi";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const fetchSettings = await fetch(API_URL + "/settings", {
    next: { tags: ["siteSettings"] },
  });
  const settings: ToOnboard = await fetchSettings.json();

  return {
    title:
      settings.settings?.siteName + " - " + settings.settings?.siteCaption ??
      "redy-blog",
    description:
      settings.settings?.siteCaption ?? "Blog App with NextJS and SpringBoot",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchSettings = await fetch(API_URL + "/settings", {
    next: { tags: ["siteSettings"] },
  });
  const settings: ToOnboard = await fetchSettings.json();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen flex-col">
            {settings.toOnBoard ? (
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
