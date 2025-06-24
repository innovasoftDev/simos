import Link from "next/link";
import { Card } from "@/components/ui/card";
//import AuthLayout from '../auth-layout'
import { OtpForm } from "./components/otp-form";
import { buttonVariants } from "@/components/ui/button";

export default function OtpPass() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
        <div className="mb-4 flex items-center justify-center">
          <h1 className="text-xl font-medium">SIMOS</h1>
        </div>
        <div>
          <Card className="p-6">
            <div className="mb-2 flex flex-col space-y-2 text-left">
              <h1 className="text-md font-semibold tracking-tight">
                One-Time Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Ingresa el otp que se ha enviado a tu correo.
              </p>
            </div>
            <OtpForm />
            <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
              <p className="text-sm text-muted-foreground text-center tracking-tight">
                Si necesita un usuario nuevo, debe comunicarse con el
                administrador del sistema.
              </p>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
