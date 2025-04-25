import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import ExitososPage from "./exitososPage";

export const metadata = {
  title: "Dashboard : Exitosos",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <ExitososPage />;
  }
}
