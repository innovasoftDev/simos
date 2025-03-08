export type User = {
  id_user: string;
  status: string;
  tbl_usr_roles_id_rol: string;
  email: string;
  image: string | null;
  password: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  emailVerified: Date | null;
  phoneNumber: string | null;
  created: Date | null;
  updated: Date | null;
};