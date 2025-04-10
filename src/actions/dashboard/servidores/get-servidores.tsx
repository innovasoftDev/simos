"use server";

import { getIdByObjeto } from "@/actions/admin/pantallas/getIdByObject";
import { GetUserById } from "@/actions/admin/users/getUserById";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const GetServidores = async () => {
  const session = await auth();

  //? Obteniendo id del role que tiene el usuario
  const id_user = session?.user.id;
  const id_rol = GetUserById(id_user);

  const permisos = await id_rol;

  console.log(permisos);

  //? Obteniendo id del objeto actual
  /* const nombreObjeto = "Servidores";
  const objeto = getIdByObjeto(nombreObjeto, await id_rol);

  const permisos = await objeto;

  //? Obteniendo los permisos del objeto sobre el rol actual
  const permisoConsulta = permisos?.Permiso_Consulta;

  if (!permisoConsulta) {
    console.log(id_rol);

    return {
      ok: false,
      message: "Su usuario no tiene permisos para consultar esta pantalla.",
    };
  } */

  const servers = await prisma.servidor.findMany({
    orderBy: {
      Id_Servidor: "desc",
    },
    include: {
      Grup_Servidor: true,
    },
  });

  return {
    ok: true,
    message: "",
    servers: servers,
  };
};
