import { z } from "zod";

export type Exito = {
  Id_Exito_Servicio: string;
  Estado: string;
  Codigo_Exito: string;
  Descripcion_Exito: string | null;
  ServicioId: string;
  created: Date;
  Servicio: {
    Nombre_Servicio: string;
    ServidorId: string;
  };
};

const exitosoStatusSchema = z.union([z.string(), z.string()]);

export type ExitosoStatus = z.infer<typeof exitosoStatusSchema>;
