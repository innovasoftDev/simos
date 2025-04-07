import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import PermisosPage from "./permisosPage";

export const metadata = {
  title: "Dashboard : Admin : Permisos",
};

export default async function page() {
  const session = await auth();

  if (session?.user.role === "admin") {
    return <PermisosPage />;
  } else {
    redirect("/");
  }
}
