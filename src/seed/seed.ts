//import bcryptjs from "bcryptjs";
//import prisma from "../lib/prisma";

interface SeedRole {
  rol: "admin" | "user";
  descripcion: string | null;
  created: Date;
}

interface SeedRoles {
  roles: SeedRole[];
}

export const initialRolesData: SeedRoles = {
  roles: [
    {
      rol: "admin",
      descripcion: "Usuario Administrador",
      created: new Date(),
    },
    {
      rol: "user",
      descripcion: "Usuario Normal",
      created: new Date(),
    },
  ],
};

