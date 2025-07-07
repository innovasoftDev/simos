"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { Bitacora } from "@/app/dashboard/admin/Bitacora/data/schema";

type GetAllBitacoraResult = {
  ok: boolean;
  message?: string;
  bitacora?: Bitacora[]
};

export const getAllBitacora = async (): Promise<GetAllBitacoraResult> => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe ser un usuario administrador para acceder a esta información.",
    };
  }

  try {
    const bitacoraDbRecords = await prisma.bitacora.findMany({
      orderBy: {
        fechaHora: "desc",
      },
    });

    const mappedBitacora: Bitacora[] = bitacoraDbRecords.map(record => ({
      id_bitacora: record.id_bitacora,
      id_user: record.id_user,
      username: record.username,
      fechaHora: record.fechaHora,
      accion: record.accion,
      descripcion: record.descripcion,
      entidad: record.entidad,
    }));

    return {
      ok: true,
      bitacora: mappedBitacora,
    };
  } catch (error) {
    console.error("Error al obtener la bitácora:", error);
    return {
      ok: false,
      message: "No se pudo cargar la información de la bitácora desde la base de datos.",
    };
  }
};