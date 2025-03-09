"use server";

import prisma from "@/lib/prisma";

export async function getRoleById(id: string): Promise<string> {
  const role = await prisma.tBL_USR_ROLES.findUnique({
    where: { id_rol: id },
    select: { rol: true },
  });

  return role?.rol ?? "";
}

export async function getIdByRole(role: string): Promise<string> {
  const admin = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: 'admin' },
    select: { id_rol: true },
  });

  const user = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: 'user' },
    select: { id_rol: true },
  });

  /* console.log(admin?.id_rol); */
  if (role === "admin") {
    return admin?.id_rol ?? "";
  } else {
    return user?.id_rol ?? "";
  }
  
}