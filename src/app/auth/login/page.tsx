import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import SignInViewPage from "./sigin-view";

export default function LoginPage() {
 /*  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">
        <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
          <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>
          <LoginForm />
        </div>
      </div>
    </main>
  ); */

  return <SignInViewPage />;
}
