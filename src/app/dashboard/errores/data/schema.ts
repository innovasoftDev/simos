import { z } from "zod";

export type Service = {
  id_servicio: string;
  id_servidor: string;
  nombre_servicio: string;
  descripcion: string | null;
  status: string;
  created: Date | null;
  updated: Date | null;
};

const serviceStatusSchema = z.union([z.string(), z.string()]);

export type ServiceStatus = z.infer<typeof serviceStatusSchema>;
