import { z } from "zod";

export type Bitacora = {
  id_bitacora: string;
  id_user: string;
  username: string;
  fechaHora: Date;
  accion: string; // Ej: "CREAR", "ACTUALIZAR", "ELIMINAR"
  descripcion: string | null; // Detalle de lo que ocurrió
  entidad: string; // Ej: "Usuario", "Servidor", "Servicio"
};

const bitacoraStatusSchema = z.union([z.string(), z.string()]);
export type BitacoraStatus = z.infer<typeof bitacoraStatusSchema>;
