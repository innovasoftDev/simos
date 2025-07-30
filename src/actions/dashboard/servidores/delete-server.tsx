"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { getIdByObjeto } from "@/actions/admin/pantallas/getIdByObject";
import { getIdByRole } from "@/actions/admin/roles/getRoleById";
import { registrarBitacora } from "@/lib/logBitacora";


export const DeleteServer = async (id_server: string, motivo: string) => {
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
  const Permiso_Elimina = permisos?.Permiso_Elimina;

  if (!Permiso_Elimina) {
    return {
      ok: false,
      message: "Su usuario no tiene permisos para eliminar en esta pantalla.",
    };
  }

  try {
    const serverToDelete = await prisma.servidor.findUnique({
      where: { Id_Servidor: id_server },
      select: { Nombre_Servidor: true }
    });

    await prisma.servidor.delete({
      where: {
        Id_Servidor: id_server,
      },
    });

    
    await registrarBitacora({
      id_user: adminUserId,
      username: adminUsername,
      accion: 'ELIMINAR_SERVIDOR',
      entidad: 'Servidor',
      descripcion: `Servidor "${serverToDelete?.Nombre_Servidor || id_server}" eliminado. Motivo: ${motivo}`,
      fechaHora: new Date(),
    });

    revalidatePath("/dashboard/servidores");

    return {
      ok: true,
      message: `Servidor "${serverToDelete?.Nombre_Servidor || 'desconocido'}" eliminado exitosamente.`,
    };
  } catch (error: any) {
    if (error.code === 'P2003') {
      return {
        ok: false,
        message: "No se puede eliminar el servidor porque tiene servicios asociados.",
      };
    }

    return {
      ok: false,
      message: error.message || "No se pudo eliminar el servidor. Por favor, revisar los logs.",
    };
  }
};
