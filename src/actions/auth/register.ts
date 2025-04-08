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

export const registerUser = async (values: {
  firstName: string | null;
  lastName: string | null;
  username: string;
  phoneNumber: string | null;
  email: string;
  password: string;
  confirmPassword: string;  
}) => {
  try {
    const newUser = { ...values };

    console.log(newUser);

    await prisma.user.create({
      data: {
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: bcryptjs.hashSync(newUser.password),
        phoneNumber: newUser.phoneNumber,
        status: "active",
        created: new Date(),
        tbl_usr_roles_id_rol: (await getIdByRole("user")).toString(),
      },
    });

    return {
      ok: true,
      user: newUser,
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
