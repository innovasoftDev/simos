"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { auth } from "@/auth.config";
//import { PrismaClient, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getIdByRole } from "../roles/getRoleById";

export const AddOrUpdateUser = async (values: {
  id_user: string;
  firstName: string | null;
  status: string;
  lastName: string | null;
  username: string;
  phoneNumber: string | null;
  email: string;
  password: string;
  tbl_usr_roles_id_rol: string;
  confirmPassword: string;
  rol: {
    rol: string;
    id_rol: string;
    descripcion: string | null;
  };
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

    //console.log(newUser);

    if (!newUser.isEdit) {
      await prisma.user.create({
        data: {
          email: newUser.email,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: bcryptjs.hashSync(newUser.password),
          phoneNumber: newUser.phoneNumber,
          status: newUser.status,          
          created: new Date(),
          tbl_usr_roles_id_rol: (
            await getIdByRole(newUser.rol.rol)
          ).toString(),
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id_user: newUser.id_user,
        },
        data: {
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: bcryptjs.hashSync(newUser.password),
          phoneNumber: newUser.phoneNumber,
          status: newUser.status,
          updated: new Date(),
          tbl_usr_roles_id_rol: (
            await getIdByRole(newUser.rol.rol)
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
