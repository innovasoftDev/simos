"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getUsers = async () => {
  const session = await auth();

  /* if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de ser un usuario administrador",
    };
  } */

  const servicios = await prisma.servicio.findMany({
    orderBy: {
      Id_Servicio: "desc",
    },
    include: {
      Servidor: true, // ← trae el rol relacionado
    },
  });

  return {
    ok: true,
    users: servicios,
  };
};
