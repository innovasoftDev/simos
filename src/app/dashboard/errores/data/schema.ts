import { z } from "zod";

export type Errors = {
  Id_Error_Servicio: string;
  Estado: string;
  Codigo_Error: string;
  Descripcion_Error: string | null;
  ServicioId: string;
  created: Date;
  Servicio: {
    Nombre_Servicio: string;
    ServidorId: string;
  };
};

const exitosoStatusSchema = z.union([z.string(), z.string()]);

export type ExitosoStatus = z.infer<typeof exitosoStatusSchema>;
