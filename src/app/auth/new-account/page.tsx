//import { titleFont } from "@/config/fonts";
import { SignUpForm } from "./ui/sign-up-form";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import PageContainer from '../../../components/layout/page-container';

export default function NewAccountPage() {
  return (
    <PageContainer scrollable>
      <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
    </PageContainer>
  );
}
