"use server";

import prisma from "@/lib/prisma";
// import { sleep } from '@/utils';

export const getRoles = async () => {
  try {
    const roles = await prisma.tBL_USR_ROLES.findMany();

    return {
      ...roles,
    };
  } catch (error) {
    //console.log(error);
    throw new Error('Error al obtener roles.');
  }
};
