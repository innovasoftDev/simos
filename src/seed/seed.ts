//import bcryptjs from "bcryptjs";
//import prisma from "../lib/prisma";

interface SeedRole {
  rol: "admin" | "user";
  descripcion: string | null;
}

interface SeedRoles {
  roles: SeedRole[];
}

export const initialRolesData: SeedRoles = {
  roles: [
    {
      rol: "admin",
      descripcion: "Usuario Administrador",
    },
    {
      rol: "user",
      descripcion: "Usuario Normal",
    },
  ],
};

