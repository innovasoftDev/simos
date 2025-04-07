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

async function getIdFromObject(nameObject: string): Promise<string> {
  const idObject = await prisma.objeto.findUnique({
    where: { Nombre_Objeto: nameObject },
    select: { Id_Objeto: true },
  });

  return idObject?.Id_Objeto ?? "";
}

async function getIdFromRole(nameRole: string): Promise<string> {
  const idRole = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: nameRole },
    select: { id_rol: true },
  });

  return idRole?.id_rol ?? "";
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

async function CreatePermiso(
  Permiso_Inserta: boolean,
  Permiso_Actualiza: boolean,
  Permiso_Elimina: boolean,
  Permiso_Consulta: boolean,
  Pantalla: string,
  Rol: string
) {
  try {
    await prisma.permiso.create({
      data: {
        Permiso_Inserta: Permiso_Inserta,
        Permiso_Actualiza: Permiso_Actualiza,
        Permiso_Elimina: Permiso_Elimina,
        Permiso_Consulta: Permiso_Consulta,
        ObjetoId: (await getIdFromObject(Pantalla)).toString(),
        TBL_USR_ROLESId: (await getIdFromRole(Rol)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  //! Borrar registros previos
  await prisma.user.deleteMany();
  await prisma.permiso.deleteMany();
  await prisma.objeto.deleteMany();
  await prisma.tBL_USR_ROLES.deleteMany();

  //! Para vista roles
  //? Creando roles admin y user
  const { roles } = initialRolesData;
  await prisma.tBL_USR_ROLES.createMany({
    data: roles,
  });

  await delay(50);

  //! Para Vista Usuarios
  //? Creando usuario administrador
  CreateUser(
    "admin",
    "Usuario",
    "Administrador",
    "admin@google.com",
    "12345678",
    "admin",
    "active"
  );
  //? Creando usuario normal
  CreateUser(
    "user",
    "Usuario",
    "Normal",
    "user@google.com",
    "12345678",
    "user",
    "inactive"
  );
  await delay(100);
  
  //! Creando las pantallas actuales en gestion de pantallas
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
  //? Acerca De
  CreatePantallas(
    "AcercaDe",
    "Sobre nosotros el grupo de Innovasoft Dev.",
    "Pantalla",
    "active"
  );

  await delay(100);

  //! Para vista Permisos
  //? Creando permiso para Dashboard
  CreatePermiso(true, false, true, false, "Dashboard", "admin");
  CreatePermiso(true, true, true, true, "Servicios", "admin");
  CreatePermiso(true, true, true, true, "Servidores", "admin");
  CreatePermiso(true, true, true, true, "Alertas", "admin");
  CreatePermiso(true, true, true, true, "Errores", "admin");  
  CreatePermiso(true, false, true, false, "AcercaDe", "admin");

  console.log("Seed ejecutado correctamente");
}

// Simple delay function using setTimeout and promise
export const delay = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
