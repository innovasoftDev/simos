import { z } from "zod";
import { create } from 'zustand';

export type Role = {
  rol: string | undefined;
  id_rol: string;
  descripcion: string | null;
};

const roleStatusSchema = z.union([z.string(), z.string()]);
export type RoleStatus = z.infer<typeof roleStatusSchema>;
