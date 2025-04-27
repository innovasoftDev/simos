import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function EmptyPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?returnTo=/perfil");
  } else {
    redirect("/dashboard/overview");
  }
}
