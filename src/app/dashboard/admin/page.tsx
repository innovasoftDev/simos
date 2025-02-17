import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

export const metadata = {
  title: "Dashboard : Admin",
};

export default async function page() {
  const session = await auth();

  if (session?.user.role === "admin") {
    redirect("/dashboard/admin/users");
  } else {
    redirect("/");
  }
}
