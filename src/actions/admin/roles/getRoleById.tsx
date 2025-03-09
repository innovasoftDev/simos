"use server";

import prisma from "@/lib/prisma";

export async function getRoleById(id: string): Promise<string> {
  const role = await prisma.tBL_USR_ROLES.findUnique({
    where: { id_rol: id },
    select: { rol: true },
  });

  return role?.rol ?? "";
}
