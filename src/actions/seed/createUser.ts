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
export const CreateUsers = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: bcryptjs.hashSync(password),
        status: true,
        tbl_usr_roles_id_rol: (await getIdByRole(role)).toString(),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
