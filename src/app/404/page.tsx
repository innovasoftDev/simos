import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import NotFound from "./404";

export const metadata = {
  title: "Administración : 404",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <NotFound/>;
  }
}
