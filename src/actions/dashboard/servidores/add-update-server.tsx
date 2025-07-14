"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { GetServerByName } from "../servidores/get-group-by-id";
import { getIdByObjeto } from "@/actions/admin/pantallas/getIdByObject";
import { getIdByRole } from "@/actions/admin/roles/getRoleById";
import { registrarBitacora } from "@/lib/logBitacora";

export const AddOrUpdateServer = async (values: {
  Id_Servidor: string;
  Nombre_Servidor: string;
  Descripcion: string | null;
  CPU: string | null;
  Memoria: string | null;
  Tipo_Sevidor: string | null;
  Nombre_AD: string | null;
  URL: string | null;
  Estado: string;
  Grup_ServidorId: string;
  Grup_Servidor: {
    Nombre_Grupo_Servidores: string;
  };
  isEdit: boolean;
}) => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      ok: false,
      message: "No autenticado. Por favor, inicie sesión.",
    };
  }

  const adminUserId = session.user.id;
  const adminUsername = session.user.name || session.user.email || 'Usuario del Sistema';


  const role_user = session.user.role;
  const id_rol = await getIdByRole(role_user);


  const nombreObjeto = "Servidores";
  const permisos = await getIdByObjeto(nombreObjeto, id_rol);


  if (values.isEdit) {
    const Permiso_Actualiza = permisos?.Permiso_Actualiza;

    if (!Permiso_Actualiza) {
      return {
        ok: false,
        message:
          "Su usuario no tiene permisos para actualizar un servidor.",
      };
    }
  } else {
    const Permiso_Inserta = permisos?.Permiso_Inserta;

    if (!Permiso_Inserta) {

      return {
        ok: false,
        message:
          "Su usuario no tiene permisos para agregar nuevo servidor.",
      };
    }
  }

  try {
    const newServer = { ...values };

    let grupoServidorIdReal: string;
    try {
      grupoServidorIdReal = (await GetServerByName(newServer.Grup_Servidor.Nombre_Grupo_Servidores)).toString();
    } catch (error) {
      //console.error("Error al obtener ID del grupo de servidor:", error);
      return {
        ok: false,
        message: "No se pudo encontrar el grupo de servidor especificado.",
      };
    }

    if (!newServer.isEdit) {
      await prisma.servidor.create({
        data: {
          Nombre_Servidor: newServer.Nombre_Servidor,
          Descripcion: newServer.Descripcion,
          CPU: newServer.CPU,
          Memoria: newServer.Memoria,
          Tipo_Sevidor: newServer.Tipo_Sevidor,
          Nombre_AD: newServer.Nombre_AD,
          URL: newServer.URL,
          Estado: newServer.Estado,
          Grup_ServidorId: grupoServidorIdReal,
          created: new Date(),
        },
      });

      await registrarBitacora({
        id_user: adminUserId,
        username: adminUsername,
        accion: 'CREAR_SERVIDOR',
        entidad: 'Servidor',
        descripcion: `Servidor "${newServer.Nombre_Servidor}" creado.`,
        fechaHora: new Date(),
      });

    } else {
      await prisma.servidor.update({
        where: {
          Id_Servidor: newServer.Id_Servidor,
        },
        data: {
          Nombre_Servidor: newServer.Nombre_Servidor,
          Descripcion: newServer.Descripcion,
          CPU: newServer.CPU,
          Memoria: newServer.Memoria,
          Tipo_Sevidor: newServer.Tipo_Sevidor,
          Nombre_AD: newServer.Nombre_AD,
          URL: newServer.URL,
          Estado: newServer.Estado,
          Grup_ServidorId: grupoServidorIdReal,
          updated: new Date(),
        },
      });

      await registrarBitacora({
        id_user: adminUserId,
        username: adminUsername,
        accion: 'ACTUALIZAR_SERVIDOR',
        entidad: 'Servidor',
        descripcion: `Servidor "${newServer.Nombre_Servidor}" actualizado.`,
        fechaHora: new Date(),
      });
    }

    revalidatePath("/dashboard/servidores");

    return {
      ok: true,
      message: `Servidor "${newServer.Nombre_Servidor}" ${newServer.isEdit ? 'actualizado' : 'creado'} exitosamente.`,
    };
  } catch (error: any) {
    //console.error("Error en AddOrUpdateServer:", error);

    if (error.code === 'P2002' && error.meta?.target?.includes('Nombre_Servidor')) {
      return {
        ok: false,
        message: "Ya existe un servidor con ese nombre. Por favor, ingrese uno diferente.",
      };
    }

    return {
      ok: false,
      message: error.message || "No se pudo agregar o actualizar el servidor. Por favor, revisar los logs.",
    };
  }
};