"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";


async function getIdByRole(role: string): Promise<string> {
  const admin = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: role },
    select: { id_rol: true },
  });

  console.log(admin?.id_rol);
  
  return admin?.id_rol ?? "";
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name,
        password: bcryptjs.hashSync(password),
        status: true,
        tbl_usr_roles_id_rol: (await getIdByRole("admin")).toString(),
      },
      select: {
        id_user: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: "Usuario creado",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
};
