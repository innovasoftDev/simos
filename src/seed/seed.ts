import bcryptjs from "bcryptjs";
import prisma from "../lib/prisma";

interface SeedRole {
  rol: "admin" | "user";
  descripcion: string;
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  status: string;
  tbl_usr_roles_id_rol: string;
}

interface SeedUsers {
  users: SeedUser[];
}

interface SeedRoles {
  roles: SeedRole[];
}

interface SeedData {
  users: SeedUser[];
  roles: SeedRole[];
}

export const initialUserData: SeedUsers = {
  users: [
    {
      email: "admin@google.com",
      name: "Administrador",
      password: bcryptjs.hashSync("12345678"),
      status: 'true',
      tbl_usr_roles_id_rol: '',
    },
    {
      email: "user@google.com",
      name: "Usuario",
      password: bcryptjs.hashSync("12345678"),
      status: 'true',
      tbl_usr_roles_id_rol: '',
    },
  ],
};

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

/* export const initialData: SeedData = {
  users: [
    {
      email: "admin@google.com",
      name: "Administrador",
      password: bcryptjs.hashSync("12345678"),
      status: true,
      tbl_usr_roles_id_rol: '',
    },
    {
      email: "user@google.com",
      name: "Usuario",
      password: bcryptjs.hashSync("12345678"),
      status: true,
      tbl_usr_roles_id_rol: '',
    },
  ],
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
}; */