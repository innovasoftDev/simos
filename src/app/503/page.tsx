import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import MaintenanceError from "./503";

export const metadata = {
  title: "Administración : 503",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <MaintenanceError/>;
  }
}
