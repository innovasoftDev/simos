"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getUsers = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de ser un usuario administrador",
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      username: "desc",
    },
    include: {
      rol: true, // ← trae el rol relacionado
    },
  });

  return {
    ok: true,
    users: users,
  };
};
