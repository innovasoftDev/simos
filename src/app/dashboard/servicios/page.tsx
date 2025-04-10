import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import ServicesPage from "./servicesPage";

export const metadata = {
  title: "Dashboard : Servicios",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <ServicesPage />;
  }
}
