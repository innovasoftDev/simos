"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { getIdByRole } from "../roles/getRoleById";
import { registrarBitacora } from "@/lib/logBitacora";

export const AddOrUpdateUser = async (values: {
  id_user: string;
  firstName: string | null;
  status: string;
  lastName: string | null;
  username: string;
  phoneNumber: string | null;
  email: string;
  password: string;
  tbl_usr_roles_id_rol: string;
  confirmPassword: string;
  rol: {
    rol: string;
    id_rol: string;
    descripcion: string | null;
  };
  isEdit: boolean;
}) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de estar autenticado como admin",
    };
  }

  try {
    const newUser = { ...values };
    const adminUser = session.user;
    const adminUserId = adminUser.id;
    const adminUsername = adminUser.name || adminUser.email || 'Usuario Desconocido';

    if (!newUser.isEdit) {
      await prisma.user.create({
        data: {
          email: newUser.email,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: bcryptjs.hashSync(newUser.password),
          phoneNumber: newUser.phoneNumber,
          status: newUser.status,
          created: new Date(),
          tbl_usr_roles_id_rol: (await getIdByRole(newUser.rol.rol)).toString(),
        },
      });

      await registrarBitacora({
        id_user: adminUserId,
        username: adminUsername,
        accion: 'CREAR_USUARIO',
        entidad: 'User',
        descripcion: `Se creó el usuario ${newUser.username}`,
        fechaHora: new Date(),
      });
    } else {
      await prisma.user.update({
        where: {
          id_user: newUser.id_user,
        },
        data: {
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: bcryptjs.hashSync(newUser.password),
          phoneNumber: newUser.phoneNumber,
          status: newUser.status,
          updated: new Date(),
          tbl_usr_roles_id_rol: (await getIdByRole(newUser.rol.rol)).toString(),
        },
      });

      await registrarBitacora({
        id_user: adminUserId,
        username: adminUsername,
        accion: 'ACTUALIZAR_USUARIO',
        entidad: 'User',
        descripcion: `Se actualizó el usuario ${newUser.username}`,
        fechaHora: new Date(),
      });
    }

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error: any) {
    //console.error("Error en AddOrUpdateUser:", error);
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('username')) {
        return {
          ok: false,
          message: "Ya existe un usuario con ese nombre de usuario. Por favor, ingrese uno diferente.",
        };
      }
      if (error.meta?.target?.includes('email')) {
        return {
          ok: false,
          message: "Ya existe un usuario con ese correo electrónico. Por favor, ingrese uno diferente.",
        };
      }
    }
    return {
      ok: false,
      message: error.message || "No se pudo realizar la operación. Por favor, intente de nuevo.",
    };
  }
};