"use server";
import bcryptjs from "bcryptjs";
import prisma from '@/lib/prisma';

async function getIdByRole(role: string): Promise<string> {
  const admin = await prisma.tBL_USR_ROLES.findUnique({
    where: { rol: role },
    select: { id_rol: true },
  });

  /* console.log(admin?.id_rol); */

  return admin?.id_rol ?? "";
}
/* export const getStockBySlug = async( slug: string ): Promise<number> => {*/
async function CreateUser(username: string, firstname: string, lastname: string, email: string, password: string, role: string, status : string) {
  try {
    await prisma.user.create({
      data: {
        email: email,
        username: username,
        firstName: firstname,
        lastName: lastname,
        password: bcryptjs.hashSync(password),
        status: status,
        tbl_usr_roles_id_rol: (await getIdByRole(role)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}
