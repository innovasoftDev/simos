import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import prisma from "./lib/prisma";
import { Role } from "./app/dashboard/admin/roles/data/schema";

async function getRoleById(id: string): Promise<string> {
  const role = await prisma.tBL_USR_ROLES.findUnique({
    where: { id_rol: id },
    select: { rol: true },
  });

  return role?.rol ?? "";
}

export const GetUserById = async (email?: string) => {
  const idRoleUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      rol: true, // ← trae el rol relacionado
    },
  });

  return idRoleUser;
};

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth });
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard/overview");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard/overview", nextUrl));
      }
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user = token.data as any;

      //! Validar que el usuario esté activo
      const usuario = await GetUserById(session.user.email);
      //const estadoUsuario = usuario?.status;
      const roleUsuario = usuario?.rol.rol;
      const nombreUsuario = usuario?.username;

      /* if (estadoUsuario?.toLowerCase() === "active") {
        session.user.role = roleUsuario as string;
        session.user.name = nombreUsuario as string;

        return session;  
      }  */

      session.user.role = roleUsuario as string;
      session.user.name = nombreUsuario as string;

      console.log(session);

      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
