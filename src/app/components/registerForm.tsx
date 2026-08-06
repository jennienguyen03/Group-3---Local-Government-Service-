"use client";
import { useState } from "react";
import Link from "next/link";
export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  

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
           <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">
            Register
          </button>
            <p>Already have an account? <Link href="/">Login</Link></p>

        </form>;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return; //prevents the page from going further if the password do not match
  }
  setError("") //clear any old error if validation goes through
  //extra logic here for when someone submits the form 
  } //prevents the page from refreshing when the form is submitted later logic will be added for passing to the backend to authorise
}