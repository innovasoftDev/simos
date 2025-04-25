"use server";

import { getIdByObjeto } from "@/actions/admin/pantallas/getIdByObject";
import { getIdByRole } from "@/actions/admin/roles/getRoleById";
//import { GetUserById } from "@/actions/admin/users/getUserById";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const GetErrores = async () => {
  const session = await auth();

  //? Obteniendo id del role que tiene el usuario
  const role_user = session?.user.role;
  const id_rol = await getIdByRole(role_user);

  //console.log(id_rol);

  //? Obteniendo id del objeto actual
  const nombreObjeto = "Errores";
  const permisos = await getIdByObjeto(nombreObjeto, id_rol);

  //console.log(permisos);

  const permisoConsulta = permisos?.Permiso_Consulta;

  if (!permisoConsulta) {
    //console.log("Su usuario no tiene permisos para consultar esta pantalla.");
    
    return {
      ok: false,
      message: "Su usuario no tiene permisos para consultar esta pantalla.",
    };
  }

  const errores = await prisma.error_Servicio.findMany({
    orderBy: {
      Id_Error_Servicio: "desc",
    },
    include: {
      Servicio: true,
    },
  });

  return {
    ok: true,
    message: "",
    errores: errores,
  };
};
