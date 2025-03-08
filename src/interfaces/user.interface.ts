export interface User {
    firstName: string | null;
    lastName: string | null;
    username: string;
    email: string;
    phoneNumber: string | null;
    status: string;
    image: string | null;
    id_user: string;
    emailVerified: Date | null;
    password: string;
    created: Date | null;
    updated: Date | null;
    tbl_usr_roles_id_rol: string;
}
