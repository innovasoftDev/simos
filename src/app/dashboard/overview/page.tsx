import { redirect } from "next/navigation";
import OverViewPage from "./_components/overview";
import { auth } from "@/auth.config";

export const metadata = {
  title: "Dashboard : Overview",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <OverViewPage />;
  }
}
