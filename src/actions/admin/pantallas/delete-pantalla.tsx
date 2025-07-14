"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const DeletePantalla = async (id_objeto: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como admin",
    };
  }

  try {
    //console.log(id_objeto);

    await prisma.objeto.delete({
      where: {
        Id_Objeto: id_objeto,
      },
    })

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
