"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const AddUser = async (values: {}) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como admin",
    };
  }

  try {
    /* const { email, username } = values; */

   /*  const user = await prisma.user.create({
   
      data: {
        email: values.email,
        username: "Elsa Prisma",
      },
    }); */

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
