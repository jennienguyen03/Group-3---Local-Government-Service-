import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
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
};

export const { auth } = NextAuth(authConfig);