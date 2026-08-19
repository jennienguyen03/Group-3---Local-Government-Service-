"use server";
import { signIn, auth } from "~/server/auth/config";
import { AuthError } from "next-auth";
import { signOut } from "~/server/auth/config";

export async function loginUser(email: string, password: string) {
  try {
     await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    const session = await auth();

    return { success: true, role: session?.user.role };
  } catch (error) {
    if (error instanceof AuthError) {
      throw new Error("Invalid email or password");
    }
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
