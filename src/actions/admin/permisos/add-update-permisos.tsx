"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { getIdByRole } from "../roles/getRoleById";
import { getIdByObject } from "../pantallas/getIdByObject";

export const AddOrUpdatePermiso = async (values: {
  Id_Permiso: string;
  Permiso_Inserta: boolean;
  Permiso_Actualiza: boolean;
  Permiso_Elimina: boolean;
  Permiso_Consulta: boolean;
  ObjetoId: string;
  TBL_USR_ROLESId: string;
  Objeto: {
    Nombre_Objeto: string;
  };
  TBL_USR_ROLES: {
    rol: string;
  };
  isEdit: boolean;
}) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como admin",
    };
  }

  try {
    const nuevoPermiso = { ...values };

    if (!nuevoPermiso.isEdit) {
      await prisma.permiso.create({
        data: {
          Permiso_Inserta: nuevoPermiso.Permiso_Inserta,
          Permiso_Actualiza: nuevoPermiso.Permiso_Actualiza,
          Permiso_Elimina: nuevoPermiso.Permiso_Elimina,
          Permiso_Consulta: nuevoPermiso.Permiso_Consulta,
          created: new Date(),
          TBL_USR_ROLESId: (await getIdByRole(nuevoPermiso.TBL_USR_ROLES.rol)).toString(),
          ObjetoId: (await getIdByObject(nuevoPermiso.Objeto.Nombre_Objeto)).toString(),          
        },
      });
    } else {
      await prisma.permiso.update({
        where: {
          Id_Permiso: nuevoPermiso.Id_Permiso,
        },
        data: {
          Permiso_Inserta: nuevoPermiso.Permiso_Inserta,
          Permiso_Actualiza: nuevoPermiso.Permiso_Actualiza,
          Permiso_Elimina: nuevoPermiso.Permiso_Elimina,
          Permiso_Consulta: nuevoPermiso.Permiso_Consulta,
          updated: new Date(),
          TBL_USR_ROLESId: (await getIdByRole(nuevoPermiso.TBL_USR_ROLES.rol)).toString(),
          ObjetoId: (await getIdByObject(nuevoPermiso.Objeto.Nombre_Objeto)).toString(),
        },
      });
    }
    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    //console.log(error);
    return {
      ok: false,
      message: "No se pudo crear o actualizar la pantalla, revisar logs",
    };
  }
};
