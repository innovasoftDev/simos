"use server";

import prisma from "@/lib/prisma";

export async function getIdByPermiso(id_permiso: string, id_role: string) {
  const permisos = await prisma.permiso.findUnique({
    where: { Id_Permiso: id_permiso, TBL_USR_ROLESId: id_role },
    select: {
      Permiso_Consulta: true,
      Permiso_Inserta: true,
      Permiso_Actualiza: true,
      Permiso_Elimina: true,
    },
  });

  return {
    ok: true,
    users: permisos,
  };
}
