"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const GetAllServersGroups = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de ser un usuario administrador",
    };
  }

  const groups = await prisma.grup_Servidor.findMany({
    orderBy: {
        Id_Grup_Servidor: "desc",
    },
  });

  return {
    ok: true,
    groups: groups,
  };
};
