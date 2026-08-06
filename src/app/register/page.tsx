import { db } from "~/server/db";
import { RegisterForm } from "../components/registerForm";
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Register
        </h1>
        <RegisterForm />
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Local Government Service Request Portal
        </p>
      </div>
    </main>
  );
}
