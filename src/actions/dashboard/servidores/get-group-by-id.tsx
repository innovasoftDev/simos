"use server";

//import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const GetServerByName = async (name?: string) => {
  const idGroupServer = await prisma.grup_Servidor.findUnique({
    where: {
      Nombre_Grupo_Servidores: name,
    },
  });

  return idGroupServer?.Id_Grup_Servidor ?? "";
};
