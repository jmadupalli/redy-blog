import { Metadata } from "next";
import PostsPage from "./[page]/page";
import { ToOnboard } from "./_providers/api/userApi";
import { fetchSettings } from "./_providers/api/apiUtil";

export async function generateMetadata(): Promise<Metadata> {
  const settings: ToOnboard = await fetchSettings();

  return {
    title:
      settings && settings.settings
        ? settings.settings.siteName + " - " + settings.settings.siteCaption
        : "redy-blog",
    description:
      settings && settings.settings
        ? settings.settings.siteCaption
        : "Blog App with NextJS and SpringBoot",
  };
}

export default function HomePage() {
  return <PostsPage />;
}
