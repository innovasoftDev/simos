import { z } from "zod";

export type Server = {
  id_servidor: string;
  id_grupo_servidor: string;  
  nombre_servidor: string;
  descripcion: string | null;
  status: string;
  created: Date | null;
  updated: Date | null;
};

const serverStatusSchema = z.union([z.string(), z.string()]);

export type ServerStatus = z.infer<typeof serverStatusSchema>;
