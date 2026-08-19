"use server";
import { signIn, auth } from "~/server/auth/config";
import { AuthError } from "next-auth";
import { signOut } from "~/server/auth/config";
import { db } from "~/server/db";

export async function loginUser(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Look up the role directly rather than relying on the session,
    // since the session cookie may not be readable yet in this same request.
    const user = await db.user.findUnique({
      where: { email },
      select: { role: true },
    });

    return { success: true, role: user?.role };
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error("Invalid email or password");
    }
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}