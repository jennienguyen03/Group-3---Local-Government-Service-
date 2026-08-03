"use client";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <button type="submit">
            Login
          </button>
          <div>
            <label>Don't have an account?</label>
          </div>

           <button type="submit">
            <a href="/register">Register</a>
          </button>
          
        </form>;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  //extra logic here for when someone submits the form 
  } //prevents the page from refreshing when the form is submitted later logic will be added for passing to the backend to authorise
}