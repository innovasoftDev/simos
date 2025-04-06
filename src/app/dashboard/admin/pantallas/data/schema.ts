import { z } from "zod";

export type Pantalla = {
  Id_Objeto: number;
  Nombre_Objeto: string;
  Descripcion: string | null;
  Tipo_Objeto: string;
  Estado: string;
};

const pantallaStatusSchema = z.union([z.string(), z.string()]);
export type PantallaStatus = z.infer<typeof pantallaStatusSchema>;
