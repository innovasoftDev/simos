"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const DeleteUser = async (id_user: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como admin",
    };
  }

  try {
    await prisma.user.delete({
      where: {
        id_user: id_user,
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
      message: "No se pudo eliminar el usuario, revisar logs",
    };
  }
};
