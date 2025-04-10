import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import AlertsPage from "./alertsPage";

export const metadata = {
  title: "Dashboard : Alertas",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <AlertsPage/>;
  }
}
