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

async function getUserById(id: string): Promise<string> {
    const role_id = await prisma.user.findUnique({
      where: { id_user: id },
      select: { tbl_usr_roles_id_rol: true },
    });
  
    /* console.log(role?.rol); */
  
    return role_id?.tbl_usr_roles_id_rol ?? "";
  }

export const getRoleByUserId = async (id_user: string) => {
  try {
    const role_id : string = (await getUserById(id_user)).toString();

    const role: string = (await getRoleById(role_id)).toString();

    return {
      role,
    };
  } catch (error) {
    //console.log(error);
    throw new Error("Error al obtener rol");
  }
};
