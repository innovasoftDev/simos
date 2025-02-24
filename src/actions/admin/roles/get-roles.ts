"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedRoles = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de ser un usuario administrador",
    };
  }

  const roles = await prisma.tBL_USR_ROLES.findMany({
    orderBy: {
      rol: "desc",
    },
  });

  return {
    ok: true,
    roles: roles,
  };
};
