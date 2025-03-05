import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import UsersPage from "../servicios/userPage";


export const metadata = {
  title: "Dashboard : Servicios",
};

export default async function page() {
  const session = await auth();

/*   if (session?.user.role === "admin") { */
    return <UsersPage/>;
/*   } else {
    redirect("/");
  } */
}
