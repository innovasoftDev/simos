"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { auth } from "@/auth.config";
//import { PrismaClient, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { GetServerByName } from "../servidores/get-group-by-id";

export const AddOrUpdateServer = async (values: {
  Id_Servidor: string;
  Nombre_Servidor: string;
  Descripcion: string | null;
  CPU: string | null;
  Memoria: string | null;
  Tipo_Sevidor: string | null;
  Nombre_AD: string | null;
  URL: string | null;
  Estado: string;
  Grup_ServidorId: string;
  Grup_Servidor: {
    Nombre_Grupo_Servidores: string;
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
    const newServer = { ...values };

    //console.log(newServer);

    if (!newServer.isEdit) {
      await prisma.servidor.create({
        data: {
          Id_Servidor: newServer.Id_Servidor,
          Nombre_Servidor: newServer.Nombre_Servidor,
          Descripcion: newServer.Descripcion,
          CPU: newServer.CPU,
          Memoria: newServer.Memoria,
          Tipo_Sevidor: newServer.Tipo_Sevidor,
          Nombre_AD: newServer.Nombre_AD,
          URL: newServer.URL,
          Estado: newServer.Estado,
          Grup_ServidorId: (
            await GetServerByName(
              newServer.Grup_Servidor.Nombre_Grupo_Servidores
            )
          ).toString(),
          created: new Date(),
        },
      });
    } else {
      await prisma.servidor.update({
        where: {
          Id_Servidor: newServer.Id_Servidor,
        },
        data: {
          Nombre_Servidor: newServer.Nombre_Servidor,
          Descripcion: newServer.Descripcion,
          CPU: newServer.CPU,
          Memoria: newServer.Memoria,
          Tipo_Sevidor: newServer.Tipo_Sevidor,
          Nombre_AD: newServer.Nombre_AD,
          URL: newServer.URL,
          Estado: newServer.Estado,
          Grup_ServidorId: (
            await GetServerByName(
              newServer.Grup_Servidor.Nombre_Grupo_Servidores
            )
          ).toString(),
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
        "No se pudo ingresar, ya existe un server con ese mismo nombre, porfavor ingrese uno diferente.",
    };
  }
};
