// app/dashboard/bitacora/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import BitacoraPage from "./bitacoraPage";

export const metadata = {
  title: "Dashboard : Admin : Bitacora",
};

export default async function BitacoraPageServer() {
  const session = await auth();
  if (session?.user.role !== "admin") {
    redirect("/");
  }
  return <BitacoraPage />;
}
