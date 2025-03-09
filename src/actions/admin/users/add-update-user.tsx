"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { auth } from "@/auth.config";
//import { PrismaClient, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getIdByRole } from "../roles/getRoleById";

export const AddOrUpdateUser = async (values: {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  tbl_usr_roles_id_rol: string;
  confirmPassword: string;
  isEdit: boolean;
}) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como admin",
    };
  }

  try {
    const newUser = { ...values };

    if (!newUser.isEdit) {
      await prisma.user.create({
        data: {
          email: newUser.email,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: bcryptjs.hashSync(newUser.password),
          status: "active",
          tbl_usr_roles_id_rol: (
            await getIdByRole(newUser.tbl_usr_roles_id_rol)
          ).toString(),
        },
      });
    } else{
      await prisma.user.update({
        where: {
          email: newUser.email,
        },
        data: {
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: bcryptjs.hashSync(newUser.password),
          status: "active",
          tbl_usr_roles_id_rol: (
            await getIdByRole(newUser.tbl_usr_roles_id_rol)
          ).toString(),
        },
      });
    }
    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar el role, revisar logs",
    };
  }
};
