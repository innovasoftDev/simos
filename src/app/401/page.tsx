import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import UnauthorisedError from "./401";

export const metadata = {
  title: "Administración : 401",
};

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    return <UnauthorisedError/>;
  }
}
