import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard/overview");
  } else {
    return redirect('/');
  }
}
