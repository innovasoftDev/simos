"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { auth } from "@/auth.config";
//import { PrismaClient, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getIdByRole } from "../roles/getRoleById";

export const AddOrUpdateRole = async (values: {
  id_rol: string;
  rol: string;
  descripcion: string | null;
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
      await prisma.tBL_USR_ROLES.create({
        data: {
          rol: newUser.rol,
          descripcion: newUser.descripcion,
        },
      });
    } else {
      await prisma.tBL_USR_ROLES.update({
        where: {
          id_rol: newUser.id_rol,
        },
        data: {
          rol: newUser.rol,
          descripcion: newUser.descripcion
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
