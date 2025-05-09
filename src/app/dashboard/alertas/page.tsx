import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import AlertasPage from "./alertasPage";

export const metadata = {
  title: "Dashboard : Alertas",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <AlertasPage />;
  }
}
