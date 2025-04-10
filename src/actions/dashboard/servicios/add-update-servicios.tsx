"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { auth } from "@/auth.config";
//import { PrismaClient, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
//import { getIdByRole } from "../roles/getRoleById";

export const AddOrUpdateUser = async (values: {
  Id_Servicio: number;
  Nombre_Servicio: string;
  Descripcion: string | null;
  ServidorId: number;
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
    const newServicio = { ...values };

    //console.log(newServicio);

    /* if (!newServicio.isEdit) {
      await prisma.servicio.create({
        data: {
          email: newServicio.email,
          username: newServicio.username,
          firstName: newServicio.firstName,
          lastName: newServicio.lastName,
          phoneNumber: newServicio.phoneNumber,
          status: newServicio.status,
          created: new Date(),
          tbl_usr_roles_id_rol: (await getIdByRole(newServicio.rol.rol)).toString(),
        },
      });
    } else {
      await prisma.servicio.update({
        where: {
            Id_Servicio: newServicio.Id_Servicio,
        },
        data: {
          username: newServicio.username,
          firstName: newServicio.firstName,
          lastName: newServicio.lastName,
          password: bcryptjs.hashSync(newServicio.password),
          phoneNumber: newServicio.phoneNumber,
          status: newServicio.status,
          updated: new Date(),
          tbl_usr_roles_id_rol: (await getIdByRole(newServicio.rol.rol)).toString(),
        },
      }); */
    //}

    //revalidatePath("/admin/users");

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
