"use server";
import prisma from "@/lib/prisma";

export async function getBitacora() {
  try {
    const logs = await prisma.bitacora.findMany({
      orderBy: { fechaHora: "desc" }, 
      take: 100, 
    });

    return logs;
  } catch (error) {
    //console.error("Error al obtener la bitácora", error);
    return [];
  }
}
