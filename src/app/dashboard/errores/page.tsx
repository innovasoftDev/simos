import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import ErroresPage from "./erroresPage";

export const metadata = {
  title: "Dashboard : Errores",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <ErroresPage />;
  }
}
