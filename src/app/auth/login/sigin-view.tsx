import { Metadata } from "next";
import Link from "next/link";
import UserAuthForm from "./ui/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function SignInViewPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-black lg:flex dark:border-r background-color: bg-white">
        {/* <div className="absolute inset-0 bg-zinc-900" />  */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          SIMOS
        </div>

        <Image
          src="/imgs/LogoGrupoFarinter.png" 
          alt="logo"
          width={1000}
          height={500}
          className="m-auto"
        />
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              BIENVENIDOS
            </h1>
            <p className="text-sm text-muted-foreground tracking-tight">
              Introduzca su usuario para poder ingresar a su cuenta.
            </p>
          </div>
          <UserAuthForm />
          <p className="text-sm text-muted-foreground text-center tracking-tight">
            Si necesita un usuario nuevo u olvidó su contraseña debe comunicarse con el administrador del sistema.
          </p>
          {/* <Link
            href={"/auth/new-account"}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            Crear nueva cuenta
          </Link>   */}
        </div>
      </div>
    </div>
  );
}
