import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import prisma from "./lib/prisma";

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
      //console.log({ auth });
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
      const roleUsuario = usuario?.rol.rol;
      const nombreUsuario = usuario?.username;

      session.user.role = roleUsuario as string;
      session.user.name = nombreUsuario as string;

      //console.log(session);

      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(1), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) throw new Error("Credentials error.");

        const { username, password } = parsedCredentials.data;

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { username: username.toLowerCase() },
        });
        if (!user) throw new Error("No user found.");

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password))
          throw new Error("Wrong password.");

        if (user.status !== "active") throw new Error("Access denied.");

        // Regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
  jwt: {
    maxAge: 600,
  },
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
