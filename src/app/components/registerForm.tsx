"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "~/app/actions/user";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await registerUser(name.trim(), email.trim(), password);

      // Redirect to login after successful registration
      router.push("/login");

    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : "Registration failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            p-2
            border border-neutral-300 dark:border-neutral-700
            rounded-md
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-white
          "
        />
      </div>


      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            p-2
            border border-neutral-300 dark:border-neutral-700
            rounded-md
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-white
          "
        />
      </div>


      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            p-2
            border border-neutral-300 dark:border-neutral-700
            rounded-md
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-white
          "
        />
      </div>


      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="
            p-2
            border border-neutral-300 dark:border-neutral-700
            rounded-md
            bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-white
          "
        />
      </div>


      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}


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
        {isSubmitting ? "Registering..." : "Register"}
      </button>


      <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="
            text-neutral-900
            dark:text-white
            underline
            hover:opacity-70
          "
        >
          Login
        </Link>
      </p>

    </form>
  );
}