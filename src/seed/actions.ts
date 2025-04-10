"use-server";

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

async function getIdFromObject(objectName : string): Promise<string> {
  const idObject = await prisma.objeto.findUnique({
    where: { Nombre_Objeto: objectName },
    select: { Id_Objeto: true },
  });

  return idObject?.Id_Objeto ?? "";
}

async function getIdFromRole(roleName: string): Promise<string> {
  const idRole = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: roleName },
    select: { id_rol: true },
  });

  return idRole?.id_rol ?? "";
}

async function getIdFromGroupServers(groupName: string): Promise<string> {
  const idGroup = await prisma.grup_Servidor.findUnique({
    where: { Nombre_Grupo_Servidores: groupName },
    select: { Id_Grup_Servidor: true },
  });

  return idGroup?.Id_Grup_Servidor ?? "";
}

async function getIdFromServers(serverName: string): Promise<string> {
  const idServer = await prisma.servidor.findUnique({
    where: { Nombre_Servidor: serverName },
    select: { Id_Servidor: true },
  });

  return idServer?.Id_Servidor ?? "";
}

export async function CreateUser(
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
        created: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function CreatePantallas(
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
        created: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function CreatePermiso(
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
        created: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function CreateGrupoServers(
  Nombre_Grupo_Servidores: string,
  Descripcion: string | null
) {
  try {
    await prisma.grup_Servidor.create({
      data: {
        Descripcion: Descripcion,
        Nombre_Grupo_Servidores: Nombre_Grupo_Servidores,
        created: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

/* const users = await prisma.servidor.findMany({
  where: {
    email: {
      endsWith: 'prisma.io',
    },
  },
}) */

export async function CreateServer(
  Nombre_Servidor: string,
  Descripcion: string | null,
  Grup_Servidor: string
) {
  try {
    await prisma.servidor.create({
      data: {
        Descripcion: Descripcion,
        created: new Date(),
        Nombre_Servidor: Nombre_Servidor,
        Estado: "active",
        Grup_ServidorId: (
          await getIdFromGroupServers(Grup_Servidor)
        ).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function CreateServicio(
  Nombre_Servicio: string,
  Descripcion: string | null,
  Estado: string,
  Servidor: string
) {
  try {
    await prisma.servicio.create({
      data: {
        Descripcion: Descripcion,
        Estado: Estado,
        created: new Date(),
        Nombre_Servicio: Nombre_Servicio,
        ServidorId: (await getIdFromServers(Servidor)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}
