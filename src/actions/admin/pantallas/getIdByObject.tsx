"use server";

import prisma from "@/lib/prisma";

export async function getIdByObject(role: string): Promise<string> {
  const idRole = await prisma.objeto.findUnique({
    where: { Nombre_Objeto: role },
    select: { Id_Objeto: true },
  });
  
  return idRole?.Id_Objeto ?? "";
}