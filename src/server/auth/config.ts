import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "~/server/db";

export const {handlers, signIn, signOut, auth} = NextAuth({
    session: {strategy: "jwt"},
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials) => {
            const email = credentials?.email as string;
            const password = credentials?.password as string;
            if (!email || !password) return null;

            const user = await db.user.findUnique({ where: { email } });
            if (!user) return null;

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return null;

            return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
               };
            },
        }),
  ],
  callbacks:{
    async jwt({token, user}) {
        if (user) {
            token.id = user.id;
            token.role = user.role;
        }
        return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "RESIDENT" | "STAFF" | "ADMIN";
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});