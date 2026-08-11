import { LandingNavbar } from "~/components/LandingNavbar";
import { LoginForm } from "../components/loginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-950">
      {/* Decorative map background, very low opacity, non-interactive */}
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
    </div>
  );
}