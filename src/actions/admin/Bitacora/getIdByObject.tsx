"use server";

import prisma from "@/lib/prisma";

export async function getIdByObject(objeto: string): Promise<string> {
  const idObjeto = await prisma.objeto.findUnique({
    where: { Nombre_Objeto: objeto },
    select: { Id_Objeto: true },
  });

  return idObjeto?.Id_Objeto ?? "";
}

export const getIdByObjeto = async (nombre_objeto: string, id_rol: string) => {
  const objeto = await prisma.objeto.findUnique({
    where: { Nombre_Objeto: nombre_objeto },
    include: {
      Permisos: true, // ← trae el Permisos relacionado
    },
  });

  const Id_Permiso = objeto?.Permisos.find(Permisos => Permisos.TBL_USR_ROLESId === id_rol);

  return Id_Permiso;
};
