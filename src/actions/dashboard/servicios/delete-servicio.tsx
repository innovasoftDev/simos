"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { getIdByObjeto } from "@/actions/admin/pantallas/getIdByObject";
import { getIdByRole } from "@/actions/admin/roles/getRoleById";

export const DeleteServicio= async (id_service: string) => {
  const session = await auth();

  //? Obteniendo id del role que tiene el usuario
  const role_user = session?.user.role;
  const id_rol = await getIdByRole(role_user);

  //console.log(id_rol);

  //? Obteniendo id del objeto actual
  const nombreObjeto = "Servicios";
  const permisos = await getIdByObjeto(nombreObjeto, id_rol);

  //console.log(permisos);

  const Permiso_Elimina = permisos?.Permiso_Elimina;

  if (!Permiso_Elimina) {
    //console.log("Su usuario no tiene permisos para consultar esta pantalla.");

    return {
      ok: false,
      message: "Su usuario no tiene permisos para eliminar en esta pantalla.",
    };
  }

  try {
    await prisma.servicio.delete({
      where: {
        Id_Servicio: id_service,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    //console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar el servicio, revisar logs",
    };
  }
};
