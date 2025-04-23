import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

export const metadata = {
  title: "Dashboard : Admin",
};

export default async function AdminPage() {
  const session = await auth();

  if (session?.user.role === "admin") {
    return redirect("/dashboard/admin/users");
  } else {
    redirect("/");
  }
}
