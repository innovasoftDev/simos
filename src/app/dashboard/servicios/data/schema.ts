import { z } from "zod";

export type Servicio = {
  Id_Servicio: string;
  Nombre_Servicio: string;
  Descripcion: string | null;
  Estado: string;
  ServidorId: string;
  Servidor: {
    Nombre_Servidor: string;
  };
};

const servicioStatusSchema = z.union([z.string(), z.string()]);

export type ServicioStatus = z.infer<typeof servicioStatusSchema>;
