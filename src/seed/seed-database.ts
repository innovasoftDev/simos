//import { create } from "zustand";
import { initialRolesData } from "./seed";
//import { CreateUsers } from "../actions/seed/createUser";
import prisma from "../lib/prisma";
import bcryptjs from "bcryptjs";

async function getIdByRole(role: string): Promise<string> {
  const admin = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: "admin" },
    select: { id_rol: true },
  });

  const user = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: "user" },
    select: { id_rol: true },
  });

  /* console.log(admin?.id_rol); */
  if (role === "admin") {
    return admin?.id_rol ?? "";
  } else {
    return user?.id_rol ?? "";
  }
}

async function CreateUser(
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  role: string,
  status: string
) {
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

async function CreatePantallas(
  name: string,
  description: string,
  type_obj: string,
  status: string
) {
  try {
    await prisma.objeto.create({
      data: {
        Nombre_Objeto: name,
        Descripcion: description,
        Tipo_Objeto: type_obj,
        Estado: status,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  // 1. Borrar registros previos
  await prisma.user.deleteMany();
  await prisma.tBL_USR_ROLES.deleteMany();
  await prisma.objeto.deleteMany();

  // Creando roles admin y user
  const { roles } = initialRolesData;
  await prisma.tBL_USR_ROLES.createMany({
    data: roles,
  });

  //Creando usuario administrador
  CreateUser(
    "admin",
    "Usuario",
    "Administrador",
    "admin@google.com",
    "12345678",
    "admin",
    "active"
  );
  //Creando usuario normal
  CreateUser(
    "user",
    "Usuario",
    "Normal",
    "user@google.com",
    "12345678",
    "user",
    "inactive"
  );

  //Creando las pantallas actuales en gestion de pantallas
  //? Dashboard
  CreatePantallas(
    "Dashboard",
    "Es la pantalla principal del sistema de monitoreo, proporcionando una visión general del estado de los servicios, servidores y alertas.",
    "Pantalla",
    "active"
  );
  //? Servicios
  CreatePantallas(
    "Servicios",
    "Indica métricas como tiempo de respuesta, latencia, uso de recursos y número de peticiones procesadas.",
    "Pantalla",
    "active"
  );
  //? Servidores
  CreatePantallas(
    "Servidores",
    "Presenta información detallada sobre los servidores que ejecutan los servicios.",
    "Pantalla",
    "active"
  );
  //? Alertas
  CreatePantallas(
    "Alertas",
    "Lista las alertas generadas por el sistema cuando se detectan problemas o anomalías.",
    "Pantalla",
    "active"
  );
  //? Errores
  CreatePantallas(
    "Errores",
    "Muestra registros de errores detectados en los servicios y servidores.",
    "Pantalla",
    "active"
  );
  //? Usuarios
  CreatePantallas(
    "Usuarios",
    "Permite la gestión de los usuarios del sistema de monitoreo.",
    "Pantalla",
    "active"
  );
  console.log("Seed ejecutado correctamente");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
