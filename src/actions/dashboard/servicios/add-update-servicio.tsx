"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { getIdFromServers } from "../servidores/get-group-by-id";
import { getIdByObjeto } from "@/actions/admin/pantallas/getIdByObject";
import { getIdByRole } from "@/actions/admin/roles/getRoleById";
import { registrarBitacora } from "@/lib/logBitacora";

export const AddOrUpdateServicio = async (values: {
  Id_Servicio: string;
  Nombre_Servicio: string;
  Descripcion: string | null;
  Estado: string;
  Servidor: {
    Nombre_Servidor: string;
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
  const nombreObjeto = "Servicios";
  const permisos = await getIdByObjeto(nombreObjeto, id_rol);

  if (values.isEdit) {
    const Permiso_Actualiza = permisos?.Permiso_Actualiza;

    if (!Permiso_Actualiza) {
      return {
        ok: false,
        message: "Su usuario no tiene permisos para actualizar un servicio.",
      };
    }
  } else {
    const Permiso_Inserta = permisos?.Permiso_Inserta;

    if (!Permiso_Inserta) {
      return {
        ok: false,
        message: "Su usuario no tiene permisos para agregar nuevo servicio.",
      };
    }
  }
  try {
    const newServicio = { ...values };
    let servidorIdReal: string;
    try {
      servidorIdReal = (await getIdFromServers(newServicio.Servidor.Nombre_Servidor)).toString();
    } catch (error) {
      //console.error("Error al obtener ID del servidor:", error);
      return {
        ok: false,
        message: "No se pudo encontrar el servidor especificado.",
      };
    }

    if (!newServicio.isEdit) {
      await prisma.servicio.create({
        data: {
          Nombre_Servicio: newServicio.Nombre_Servicio,
          Descripcion: newServicio.Descripcion,
          Estado: newServicio.Estado,
          ServidorId: servidorIdReal,
          created: new Date(),
        },
      });

      await registrarBitacora({
        id_user: adminUserId,
        username: adminUsername,
        accion: 'CREAR_SERVICIO',
        entidad: 'Servicio',
        descripcion: `Servicio "${newServicio.Nombre_Servicio}" creado.`,
        fechaHora: new Date(),
      });
    } else {
      if (!newServicio.Id_Servicio) {
        return { ok: false, message: "ID de servicio requerido para actualizar." };
      }
      await prisma.servicio.update({
        where: {
          Id_Servicio: newServicio.Id_Servicio,
        },
        data: {
          Nombre_Servicio: newServicio.Nombre_Servicio,
          Descripcion: newServicio.Descripcion,
          Estado: newServicio.Estado,
          ServidorId: servidorIdReal,
          updated: new Date(),
        },
      });

      await registrarBitacora({
        id_user: adminUserId,
        username: adminUsername,
        accion: 'ACTUALIZAR_SERVICIO',
        entidad: 'Servicio',
        descripcion: `Servicio "${newServicio.Nombre_Servicio}" actualizado.`,
        fechaHora: new Date(),
      });
    }

    revalidatePath("/dashboard/servicios");

    return {
      ok: true,
      message: `Servicio "${newServicio.Nombre_Servicio}" ${newServicio.isEdit ? 'actualizado' : 'creado'} exitosamente.`,
    };
  } catch (error: any) {
    //console.error("Error en AddOrUpdateServicio:", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('Nombre_Servicio')) {
      return {
        ok: false,
        message: "Ya existe un servicio con ese nombre. Por favor, ingrese uno diferente.",
      };
    }
    return {
      ok: false,
      message: error.message || "No se pudo agregar o actualizar el servicio, revisar logs",
    };
  }
};