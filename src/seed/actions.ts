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

async function getIdFromObject(objectName: string): Promise<string> {
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

async function GetServicebyName(serviceName: string): Promise<string> {
  const idService = await prisma.servicio.findUnique({
    where: { Nombre_Servicio: serviceName },
    select: { Id_Servicio: true },
  });

  return idService?.Id_Servicio ?? "";
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
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function CreateServer(
  Nombre_Servidor: string,
  Descripcion: string | null,
  Grup_Servidor: string
) {
  try {
    await prisma.servidor.create({
      data: {
        Descripcion: Descripcion,
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
        Nombre_Servicio: Nombre_Servicio,
        ServidorId: (await getIdFromServers(Servidor)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function CreateExito(
  Estado: string,
  Codigo_Exito: string,
  Descripcion_Exito: string | null,
  ServicioId: string
) {
  try {
    await prisma.exito_Servicio.create({
      data: {
        Estado: Estado,
        Codigo_Exito: Codigo_Exito,
        Descripcion_Exito: Descripcion_Exito,
        ServicioId: (await GetServicebyName(ServicioId)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function CreateAlerta(
  Estado: string,
  Codigo_Alerta: string,
  Descripcion_Alerta: string | null,
  ServicioId: string
) {
  try {
    await prisma.alerta_Servicio.create({
      data: {
        Estado: Estado,
        Codigo_Alerta: Codigo_Alerta,
        Descripcion_Alerta: Descripcion_Alerta,
        ServicioId: (await GetServicebyName(ServicioId)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function CreateError(
  Estado: string,
  Codigo_Error: string,
  Descripcion_Error: string | null,
  ServicioId: string
) {
  try {
    await prisma.error_Servicio.create({
      data: {
        Estado: Estado,
        Codigo_Error: Codigo_Error,
        Descripcion_Error: Descripcion_Error,
        ServicioId: (await GetServicebyName(ServicioId)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}
