import { z } from "zod";

export type Server = {
  Id_Servidor: string;
  Nombre_Servidor: string;
  Descripcion: string | null;
  CPU: string | null;
  Memoria: string | null;
  Tipo_Sevidor: string | null;
  Nombre_AD: string | null;
  URL: string | null;
  Estado: string;
  Grup_ServidorId: string;
  Grup_Servidor: {
    Nombre_Grupo_Servidores: string;
  };
};

export type ServerGroup = {
  Id_Grup_Servidor: string;
  Nombre_Grupo_Servidores: string;
  Descripcion: string | null;
  created: Date;
  updated: Date | null;
};

const serverStatusSchema = z.union([z.string(), z.string()]);

export type ServerStatus = z.infer<typeof serverStatusSchema>;
