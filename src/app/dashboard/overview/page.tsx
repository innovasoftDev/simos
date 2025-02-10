import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IoBuildOutline  } from "react-icons/io5";

export default async function EmptyPage() {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoBuildOutline size={80} className="mx-5" />

      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tú Dashboard está vacío.</h1>

        <Link href="/dashboard/profile" className="text-blue-500 mt-2 text-4xl">
          Regresar
        </Link>
      </div>
    </div>
  );
}
