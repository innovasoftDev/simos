import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default async function EmptyPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/login?returnTo=/perfil');
  }else{
    redirect('/dashboard/overview');
  }


}
