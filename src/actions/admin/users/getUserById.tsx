"use server";

//import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const GetUserById = async (id?: string) => {
  const idRoleUser = await prisma.user.findUnique({
    where: {
      id_user: id,
    },
  });

  return idRoleUser?.tbl_usr_roles_id_rol ?? "";
};
