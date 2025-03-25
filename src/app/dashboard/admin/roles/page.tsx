import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import RolesPage from "./rolesPage";


export const metadata = {
  title: "Dashboard : Roles",
};

export default async function page() {
  const session = await auth();

  if (session?.user.role === "admin") {
    return <RolesPage/>;
  } else {
    redirect("/");
  }
}
