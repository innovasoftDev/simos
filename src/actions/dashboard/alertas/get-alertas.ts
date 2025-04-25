"use server";

import { getIdByObjeto } from "@/actions/admin/pantallas/getIdByObject";
import { getIdByRole } from "@/actions/admin/roles/getRoleById";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const GetAlertas = async () => {
  const session = await auth();

  //? Obteniendo id del role que tiene el usuario
  const role_user = session?.user.role;
  const id_rol = await getIdByRole(role_user);

  //console.log(id_rol);

  //? Obteniendo id del objeto actual
  const nombreObjeto = "Alertas";
  const permisos = await getIdByObjeto(nombreObjeto, id_rol);

  //console.log(permisos);

  const permisoConsulta = permisos?.Permiso_Consulta;

  if (!permisoConsulta) {
    //console.log("Su usuario no tiene permisos para consultar esta pantalla.");
    
    return {
      ok: false,
      message: "Su usuario no tiene permisos para consultar las alertas.",
    };
  }

  const alertas = await prisma.alerta_Servicio.findMany({
    orderBy: {
      Id_Alerta_Servicio: "desc",
    },
    include: {
      Servicio: true,
    },
  });

  return {
    ok: true,
    message: "",
    alertas: alertas,
  };
};
