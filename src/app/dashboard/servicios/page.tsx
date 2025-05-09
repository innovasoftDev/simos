import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import ServiciosPage from "./serviciosPage";

export const metadata = {
  title: "Dashboard : Servicios",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <ServiciosPage />;
  }
}
