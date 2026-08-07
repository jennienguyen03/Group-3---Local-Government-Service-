"use client";
import { useState } from "react";
import Link from "next/link";
import { loginUser } from "~/app/actions/auth";
import {useRouter} from "next/navigation";


export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>

          <p>
            Don't have an account? <Link href="/register">Register</Link>
          </p>
        </form>;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError("");
  setIsSubmitting(true);
  try {
    const result = await loginUser(email, password);
    if (result?.success) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  } finally {
    setIsSubmitting(false);
  }
  //extra logic here for when someone submits the form 
  } //prevents the page from refreshing when the form is submitted later logic will be added for passing to the backend to authorise
}