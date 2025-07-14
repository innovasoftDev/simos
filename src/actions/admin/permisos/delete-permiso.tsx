"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const DeletePermiso = async (id_permiso: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como admin",
    };
  }

  try {
    await prisma.permiso.delete({
      where: {
        Id_Permiso: id_permiso,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    //console.log(error);
    return {
      ok: false,
      message: "No se pudo Eliminar el Objeto, revisar logs",
    };
  }
};
