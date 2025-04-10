import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import ServersPage from "./serversPage";

export const metadata = {
  title: "Dashboard : Servidores",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <ServersPage />;
  }
}
