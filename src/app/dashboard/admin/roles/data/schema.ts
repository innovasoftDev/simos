import { z } from "zod";

export type Role = {
  rol: string;
  id_rol: string;
  descripcion: string | null;
};

const roleStatusSchema = z.union([z.string(), z.string()]);
export type RoleStatus = z.infer<typeof roleStatusSchema>;
