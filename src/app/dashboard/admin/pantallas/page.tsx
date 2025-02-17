import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import PantallasPage from "./components/pantallas";


export const metadata = {
  title: "Dashboard : User List",
};

export default async function page() {
  const session = await auth();

  if (session?.user.role === "admin") {
    return <PantallasPage />;
  } else {
    redirect("/");
  }
}