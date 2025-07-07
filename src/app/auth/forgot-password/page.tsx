import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//import AuthLayout from '../auth-layout'
import { ForgotForm } from "./components/forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
        <div className="mb-4 flex items-center justify-center">
          <h1 className="text-xl font-medium">SIMOS</h1>
        </div>
        <div>
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Cambiar Contraseña</CardTitle>
              <CardDescription>
                Ingresa tu email registrado y te enviaremos un enlace para
                restablecer tu contraseña.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ForgotForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
