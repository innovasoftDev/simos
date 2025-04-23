import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import ForbiddenError from "./403";

export const metadata = {
  title: "Administración : 403",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <ForbiddenError/>;
  }
}
