import { redirect } from "next/navigation";
/* import { auth } from "@/auth.config"; */

export const metadata = {
  title: "Dashboard : Admin",
};

export default async function AdminPage() {
  return redirect("/dashboard/admin/users");
}
