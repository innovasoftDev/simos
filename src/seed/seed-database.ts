import { create } from "zustand";
import { initialUserData, initialRolesData } from "./seed";
import { CreateUsers } from "../actions/seed/createUser";
import prisma from "../lib/prisma";
import bcryptjs from "bcryptjs";

async function getIdByRole(role: string): Promise<string> {
  const admin = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: 'admin' },
    select: { id_rol: true },
  });

  const user = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: 'user' },
    select: { id_rol: true },
  });

  /* console.log(admin?.id_rol); */
  if (role === "admin") {
    return admin?.id_rol ?? "";
  } else {
    return user?.id_rol ?? "";
  }
  
}

async function CreateUser(username: string, firstname: string, lastname: string, email: string, password: string, role: string, status : string) {
  try {
    await prisma.user.create({
      data: {
        email: email,
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: bcryptjs.hashSync(password),
        status: status,
        tbl_usr_roles_id_rol: (await getIdByRole(role)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  // 1. Borrar registros previos
  // await Promise.all( [
  await prisma.user.deleteMany();
  await prisma.tBL_USR_ROLES.deleteMany();

  const { roles } = initialRolesData;

  await prisma.tBL_USR_ROLES.createMany({
    data: roles,
  });

  //Creando usuario administrador
  CreateUser("admin", "Usuario", "Administrador", "admin@google.com", "12345678", "admin", "active");
  //Creando usuario normal
  CreateUser("user", "Usuario", "Normal", "user@google.com", "12345678", "user", "inactive");

  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
