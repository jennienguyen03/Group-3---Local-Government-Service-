"use server";
import { db } from "~/server/db";
import bcrypt from "bcrypt";

export async function registerUser(name: string, email: string, password: string) {
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}