"use server";

//import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const GetServerByName = async (name?: string) => {
  const id_server = await prisma.servidor.findUnique({
    where: {
      Nombre_Servidor: name,
    },
  });

  return id_server?.Id_Servidor ?? "";
};
