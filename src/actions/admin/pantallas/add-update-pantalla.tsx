"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const AddOrUpdatePantalla = async (values: {
  Id_Objeto: number;
  Nombre_Objeto: string;
  Descripcion: string | null;
  Tipo_Objeto: string;
  Estado: string;
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
    const nuevaPantalla = { ...values };

    if (!nuevaPantalla.isEdit) {
      await prisma.objeto.create({
        data: {
          Nombre_Objeto: nuevaPantalla.Nombre_Objeto,
          Descripcion: nuevaPantalla.Descripcion,
          Tipo_Objeto: nuevaPantalla.Tipo_Objeto,
          Estado: nuevaPantalla.Estado,
        },
      });
    } else {
      await prisma.objeto.update({
        where: {
          Id_Objeto: nuevaPantalla.Id_Objeto,
        },
        data: {
          Nombre_Objeto: nuevaPantalla.Nombre_Objeto,
          Descripcion: nuevaPantalla.Descripcion,
          Tipo_Objeto: nuevaPantalla.Tipo_Objeto,
          Estado: nuevaPantalla.Estado,
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
      message: "No se pudo crear o actualizar la pantalla, revisar logs",
    };
  }
};
