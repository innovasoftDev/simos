"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const CambiarContrasenia = async (email: string, newPassword: string) => {
  // By unique identifier
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //console.log(user);

  if (user) {
    try {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: bcryptjs.hashSync(newPassword),
        },
      });

      return {
        ok: true,
        message: "Se ha establecido la nueva contraseña exitosamente.",
      };
    } catch (error) {
      //console.log(error);

      return {
      ok: false,
      message: "Error al intentar cambiar la contraseña, revisar log",
    };
    }
  } else {
    return {
      ok: false,
      message: "No existe usuario con este correo.",
    };
  }
};
