import { titleFont } from "@/config/fonts";
import { SignUpForm } from "./ui/sign-up-form";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export default function NewAccountPage() {
  return (
    <div className="container grid h-svh flex-col items-center justify-center lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
        <div className="mb-4 flex items-center justify-center">
          <h1 className="text-xl font-medium">SIMOS</h1>
        </div>
        <div>
          <Card className="p-6">
            <div className="mb-2 flex flex-col space-y-2 text-left">
              <h1 className="text-lg font-semibold tracking-tight">
                Crea una cuenta
              </h1>
              <p className="text-sm text-muted-foreground">
                Introduzca su correo electrónico y contraseña para crear una
                cuenta. <br />
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    variant: "link",
                    size: "default",
                  })}
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
            <SignUpForm />
          </Card>
        </div>
      </div>
    </div>
  );

  /* return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>

      <RegisterForm />
    </div>
  ); */
}
