import { db } from "~/server/db";
import { RegisterForm } from "../components/registerForm";
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-medium text-text-primary">Register</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Create your account to get started.
          </p>
          <div className="mt-8">
        <RegisterForm />
        <p className="mt-2 text-zinc-600 dark:text-zinc-400"> </p>
          Local Government Service Request Portal
        </div>
        </div>
      </div>
  );
}
