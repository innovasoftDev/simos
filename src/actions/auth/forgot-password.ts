"use server";

import prisma from "@/lib/prisma";

export const ValidarCorreo = async (email: string) => {
  // By unique identifier
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //console.log(user);

  if (user) {
    if (user.status === "active") {
      return {
        ok: true,
        message: "Usuario válido.",
      };
    } else {
      return {
        ok: false,
        message: "El usuario está inactivo",
      };
    }
  }else{
    return {
      ok: false,
      message: "No existe usuario con este correo.",
    };
  }
};
