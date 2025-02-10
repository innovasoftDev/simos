import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import SignInViewPage from '../auth/_components/sigin-view';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard/overview");
  }

  /* return <SignInViewPage />; */


  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
        {children}
      </div>
    </main>
  );
}
