import { z } from "zod";

export type User = {
  email: string;
  password: string;
  status: string;
  image: string | null;
  id_user: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  emailVerified: Date | null;
  phoneNumber: string | null;
  created: Date | null;
  updated: Date | null;
  tbl_usr_roles_id_rol: string;
  rol: {
    id_rol: string;
    rol: string;
    descripcion: string | null;
  };
};

const userStatusSchema = z.union([z.string(), z.string()]);
export type UserStatus = z.infer<typeof userStatusSchema>;
