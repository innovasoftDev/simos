import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";
//import { getRole } from "./actions/admin/get-role";
import prisma from "./lib/prisma";

async function getRoleById(id: string): Promise<string> {
  const role = await prisma.tBL_USR_ROLES.findUnique({
    where: { id_rol: id },
    select: { rol: true },
  });

  return role?.rol ?? "";
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
    signOut: "/auth/login"
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

      const role = (await getRoleById(token.data.tbl_usr_roles_id_rol)).toString();

      session.user.role = role;
      session.user.name = token.data.username;

      /* console.log(role); */

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
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
