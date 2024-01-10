import { revalidateTag } from "next/cache";
import OnBoardForm from "./_components/OnBoardForm";

export default function OnBoarding() {
  revalidateTag("siteSettings");
  return (
    <>
      <OnBoardForm />
    </>
  );
}
