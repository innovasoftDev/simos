import Link from "next/link";
import { Card } from "@/components/ui/card";
//import AuthLayout from '../auth-layout'
import { ForgotForm } from "./components/forgot-password-form";
import { buttonVariants } from "@/components/ui/button";

export default function ForgotPassword() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
        <div className="mb-4 flex items-center justify-center">
          <h1 className="text-xl font-medium">SIMOS</h1>
        </div>
        <div>
          <Card className="p-6">
            <div className="mb-2 flex flex-col space-y-2 text-left">
              <h1 className="text-md font-semibold tracking-tight">
                Cambiar Contraseña
              </h1>
              <p className="text-sm text-muted-foreground">
                Ingresa tu email registrado y te enviaremos un enlace para{" "}
                <br />
                restablecer tu contraseña.
              </p>
            </div>
            <ForgotForm />
            <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
              ¿No tengo una cuenta?{" "}
              <Link
                href={"/auth/new-account"}
                className={buttonVariants({
                  variant: "link",
                  size: "default",
                })}
              >
                Registrarse
              </Link>            
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
