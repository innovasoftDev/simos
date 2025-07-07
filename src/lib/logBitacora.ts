import prisma from "@/lib/prisma";

interface BitacoraInput {
  id_user: string
  username: string
  accion: string
  entidad: string
  descripcion?: string
  fechaHora: Date
}

export async function registrarBitacora(input: BitacoraInput) {
  const { id_user, username, accion, entidad, descripcion, fechaHora } = input

  await prisma. bitacora.create({
    data: {
      id_user,
      username,
      accion,
      entidad,
      descripcion,
      fechaHora,
    },
  })
}
