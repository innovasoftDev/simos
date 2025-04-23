"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { auth } from "@/auth.config";
//import { PrismaClient, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getIdFromServers } from "../servidores/get-group-by-id";
import { getIdByObjeto } from "@/actions/admin/pantallas/getIdByObject";
import { getIdByRole } from "@/actions/admin/roles/getRoleById";

export const AddOrUpdateServicio = async (values: {
  Id_Servicio: string;
  Nombre_Servicio: string;
  Descripcion: string | null;
  Estado: string;
  ServidorId: string;
  Servidor: {
    Nombre_Servidor: string;
  };
  isEdit: boolean;
}) => {
  const session = await auth();

  //? Obteniendo id del role que tiene el usuario
  const role_user = session?.user.role;
  const id_rol = await getIdByRole(role_user);

  //console.log(id_rol);

  //? Obteniendo id del objeto actual
  const nombreObjeto = "Servicios";
  const permisos = await getIdByObjeto(nombreObjeto, id_rol);

  //console.log(permisos);
  if (values.isEdit) {
    const Permiso_Actualiza = permisos?.Permiso_Actualiza;

    if (!Permiso_Actualiza) {
      //console.log("Su usuario no tiene permisos para consultar esta pantalla.");

      return {
        ok: false,
        message: "Su usuario no tiene permisos para actualizar un servicio.",
      };
    }
  } else {
    const Permiso_Inserta = permisos?.Permiso_Inserta;

    if (!Permiso_Inserta) {
      //console.log("Su usuario no tiene permisos para consultar esta pantalla.");

      return {
        ok: false,
        message: "Su usuario no tiene permisos para agregar nuevo servicio.",
      };
    }
  }

  try {
    const newServicio = { ...values };

    //console.log(newServicio);

    if (!newServicio.isEdit) {
      await prisma.servicio.create({
        data: {
          Nombre_Servicio: newServicio.Nombre_Servicio,
          Descripcion: newServicio.Descripcion,
          Estado: newServicio.Estado,
          ServidorId: (await getIdFromServers(newServicio.Servidor.Nombre_Servidor)).toString(),
          created: new Date(),
        },
      });
    } else {
      await prisma.servicio.update({
        where: {
          Id_Servicio: newServicio.Id_Servicio,
        },
        data: {
          Nombre_Servicio: newServicio.Nombre_Servicio,
          Descripcion: newServicio.Descripcion,
          Estado: newServicio.Estado,
          ServidorId: (await getIdFromServers(newServicio.Servidor.Nombre_Servidor)).toString(),
          updated: new Date(),
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
      message:
        "No se pudo agregar o actualizar el servicio, revisar logs",
    };
  }
};
