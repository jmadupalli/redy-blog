import { revalidateTag } from "next/cache";
import SettingsForm from "./_components/SettingsForm";

export default function SiteSettings() {
  revalidateTag("siteSettings");
  return (
    <>
      <div className="container text-center w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <h2>Manage Site</h2>
      </div>
      <div className="container text-center mt-2 w-10/12 p-6 mx-auto rounded-lg shadow-sm bg-gray-50">
        <SettingsForm />
      </div>
    </>
  );
}
