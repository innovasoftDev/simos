import { z } from "zod";

export type Alerta = {
  Id_Alerta_Servicio: string;
  Estado: string;
  Codigo_Alerta: string;
  Descripcion_Alerta: string | null;
  ServicioId: string;
  created: Date;
  Servicio: {
    Nombre_Servicio: string;
    ServidorId: string;
  };
};

const exitosoStatusSchema = z.union([z.string(), z.string()]);

export type ExitosoStatus = z.infer<typeof exitosoStatusSchema>;
