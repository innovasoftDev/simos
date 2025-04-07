"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function getRoleById(id: string): Promise<string> {
  const role = await prisma.tBL_USR_ROLES.findUnique({
    where: { id_rol: id },
    select: { rol: true },
  });

  return role?.rol ?? "";
}

export const getAllPermisos = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de ser un usuario administrador",
    };
  }

  const permisos = await prisma.permiso.findMany({
    orderBy: {
      Id_Permiso: "desc",
    },
    include: {
      Objeto: true, // ← trae el objeto relacionado
      TBL_USR_ROLES: true, // ← trae el rol relacionado
    },
  });

 /*  const pantallas = permisos.map((u) => u.Objeto.Nombre_Objeto);
  const roles = permisos.map((u) => u.TBL_USR_ROLES.rol);

  console.log(pantallas);
  console.log(roles); */

  return {
    ok: true,
    permisos: permisos,
  };
};
