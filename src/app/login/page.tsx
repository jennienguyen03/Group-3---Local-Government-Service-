import { LandingNavbar } from "~/components/LandingNavbar";
import { LoginForm } from "../components/loginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">

      <LandingNavbar />

      <main
        className="
          flex
          items-center
          justify-center
          min-h-[calc(100vh-64px)]
          p-6
        "
      >

        <div
          className="
            w-full max-w-md
            p-8
            rounded-xl
            border border-neutral-200 dark:border-neutral-800
            bg-white dark:bg-neutral-900
            shadow-lg
          "
        >

          <h1
            className="
              text-2xl
              font-semibold
              text-neutral-900 dark:text-white
            "
          >
            Login
          </h1>


          <p
            className="
              mt-2
              text-sm
              text-neutral-500 dark:text-neutral-400
            "
          >
            Login to your Smart Civic account.
          </p>


          <div className="mt-8">
            <LoginForm />
          </div>


          <p
            className="
              mt-8
              pt-4
              border-t border-neutral-200 dark:border-neutral-800
              text-sm
              text-neutral-500 dark:text-neutral-400
              text-center
            "
          >
            Local Government Service Request Portal
          </p>

        </div>

      </main>

    </div>
  );
}