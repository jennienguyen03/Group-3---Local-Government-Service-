import { db } from "~/server/db";
import { LoginForm } from "./components/loginForm";
export const dynamic = "force-dynamic";

export default async function Home() {

  return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-xl font-medium text-text-primary">Sign in</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Welcome back — enter your details to continue.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
  );
}
