import { RegisterForm } from "../components/registerForm";
import { LandingNavbar } from "~/components/LandingNavbar";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-950">

      {/* Decorative map background — dark, non-interactive */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <iframe
          title="background map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=150.9%2C-33.95%2C151.3%2C-33.75&layer=mapnik"
          className="h-full w-full opacity-70"
          scrolling="no"
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <LandingNavbar />

        {/* Register Content */}
        <main className="
          flex
          items-center
          justify-center
          min-h-[calc(100vh-64px)]
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

    </div>
  );
}