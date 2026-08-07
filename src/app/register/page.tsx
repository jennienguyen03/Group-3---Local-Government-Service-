import { RegisterForm } from "../components/registerForm";
import { LandingNavbar } from "~/components/LandingNavbar";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="
      min-h-screen
      bg-neutral-100 dark:bg-neutral-950
    ">

      {/* Navbar */}
      <LandingNavbar />


      {/* Register Content */}
      <main className="
        flex
        items-center
        justify-center
        p-6
      ">

        <div className="
          w-full max-w-sm
          p-6
          rounded-lg
          border border-neutral-300 dark:border-neutral-700
          bg-white dark:bg-neutral-900
        ">

          <h1 className="
            text-xl
            font-semibold
            text-neutral-900 dark:text-white
          ">
            Register
          </h1>


          <p className="
            mt-1
            text-sm
            text-neutral-500 dark:text-neutral-400
          ">
            Create your account to get started.
          </p>


          <div className="mt-8">
            <RegisterForm />
          </div>


          <p className="
            mt-6
            text-sm
            text-neutral-500 dark:text-neutral-400
            text-center
          ">
            Local Government Service Request Portal
          </p>

        </div>

      </main>

    </div>
  );
}