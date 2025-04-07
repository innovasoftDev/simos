"use server";

import prisma from "@/lib/prisma";

export async function getIdByRole(role: string): Promise<string> {
  const idRole = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: role },
    select: { id_rol: true },
  });
  
  return idRole?.id_rol ?? "";
}

export async function getRoleById(id: string): Promise<string> {
  const role = await prisma.tBL_USR_ROLES.findUnique({
    where: { id_rol: id },
    select: { rol: true },
  });

  return role?.rol ?? "";
}