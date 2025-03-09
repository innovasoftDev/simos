import { z } from "zod";

export type User = {
  id_user: string;
  status: string;
  tbl_usr_roles_id_rol: string;
  email: string;
  image: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  emailVerified: Date;
  phoneNumber: string;
  created: Date;
  updated: Date;
};

const userStatusSchema = z.union([
  z.string(),
  z.string()
])
export type UserStatus = z.infer<typeof userStatusSchema>
