"use server";

import prisma from "@/lib/prisma";
// import { sleep } from '@/utils';

async function getRoleById(id: string): Promise<string> {
  const role = await prisma.tBL_USR_ROLES.findUnique({
    where: { id_rol: id },
    select: { rol: true },
  });

  /* console.log(role?.rol); */

  return role?.rol ?? "";
}

export const getRole = async (id: string) => {
  try {
    const role: string = (await getRoleById(id)).toString();

    return {
      role,
    };
  } catch (error) {
    //console.log(error);
    throw new Error("Error al obtener rol");
  }
};
