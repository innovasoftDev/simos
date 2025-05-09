"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function UnauthorisedError() {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        401
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold">
        Acceso no autorizado
      </h2>
      <p>
        Inicie sesión con las credenciales adecuadas para acceder a este
        recurso.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()} variant="default" size="lg">
          Regresar
        </Button>
        <Button
          onClick={() => router.push("/dashboard/overview")}
          variant="ghost"
          size="lg"
        >
          Volver a Inicio
        </Button>
      </div>
    </div>
  );
}
