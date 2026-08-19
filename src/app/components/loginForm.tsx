"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "~/app/actions/auth";


export function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();



  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    setError("");
    setIsSubmitting(true);


    try {

      const result = await loginUser(
        email.trim(),
        password
      );


      if (result?.success) {

        router.push("/dashboard");

      } else {

        setError("Invalid email or password.");

      }


    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Login failed."
      );


    } finally {

      setIsSubmitting(false);

    }

  }



  return (

    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        gap-4
      "
    >


      {/* Email */}

      <div className="flex flex-col gap-2">

        <label
          htmlFor="email"
          className="text-sm font-medium text-white"
        >
          Email
        </label>


        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            p-2
            border border-neutral-300 dark:border-neutral-700
            rounded-md
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-neutral-500
          "
        />

      </div>



      {/* Password */}

      <div className="flex flex-col gap-2">

        <label
          htmlFor="password"
          className="text-sm font-medium text-white"
        >
          Password
        </label>


        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            p-2
            border border-neutral-300 dark:border-neutral-700
            rounded-md
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-neutral-500
          "
        />

      </div>



      {/* Error */}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}



      {/* Button */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          p-2
          bg-neutral-800
          text-white
          rounded-md
          hover:bg-neutral-700
          transition
          disabled:opacity-50
        "
      >
        {
          isSubmitting
            ? "Logging in..."
            : "Login"
        }
      </button>



      {/* Register Link */}

      <p
        className="
          text-sm
          text-neutral-500 dark:text-neutral-400
          text-center
        "
      >

        Don't have an account?{" "}

        <Link
          href="/register"
          className="
            text-neutral-900
            dark:text-white
            underline
            hover:opacity-70
          "
        >
          Register
        </Link>

      </p>


    </form>

  );
}