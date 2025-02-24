export interface User {
  id_user: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password: string;
  status: boolean;
  image?: string | null;
  tbl_usr_roles_id_rol: string;
}
