"use client";
import React from "react";
import { useRouter } from "next/navigation";
import UserNavbar from "~/components/UserNavbar";

export default function Report() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <UserNavbar />

      <main className="p-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="
            mb-4 rounded-md border border-neutral-300 dark:border-neutral-700
            px-4 py-2 text-sm bg-white dark:bg-neutral-900
            text-neutral-900 dark:text-neutral-100
            hover:bg-neutral-100 dark:hover:bg-neutral-800 transition
          "
        >
          ← Back
        </button>

        <div className="flex justify-center">
          <AddIssues />
        </div>
      </main>

      {/* Go Up Button */}
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="
          fixed bottom-6 right-6 rounded-full bg-neutral-800 text-white
          w-10 h-10 hover:bg-neutral-700 transition shadow-md
          text-neutral-900 dark:text-neutral-100
        "
      >
        ↑
      </button>
    </div>
  );
}

function AddIssues() {
  const [form, setForm] = React.useState({
    title: "",
    category: "",
    description: "",
    address: "",
    date: ""
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("/api/datbase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Issue submitted successfully");
      setForm({
        title: "",
        category: "",
        description: "",
        address: "",
        date: "",
      });
    } else {
      alert("Failed to submit issue");
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col gap-4 max-w-lg w-full p-6 rounded-lg
        border border-neutral-300 dark:border-neutral-700
        bg-white dark:bg-neutral-900
        text-neutral-900 dark:text-neutral-100
      "
    >
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Report an Issue</h1>

      {/* Title */}
      <label htmlFor="title" className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="p-2 border border-neutral-300 dark:border-neutral-700 
                   rounded-md bg-white dark:bg-neutral-800"
      />

      {/* Category */}
      <label htmlFor="category" className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="p-2 border border-neutral-300 dark:border-neutral-700 
                   rounded-md bg-white dark:bg-neutral-800
                   text-neutral-900 dark:text-neutral-100"
      >
        <option value="">Select a category</option>
        <option value="infrastructure">Pot Holes</option>
        <option value="environment">Graffiti</option>
        <option value="public-safety">Water Damage</option>
      </select>

      {/* Description */}
      <label htmlFor="description" className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="p-2 border border-neutral-300 dark:border-neutral-700 
                   rounded-md bg-white dark:bg-neutral-800 min-h-[80px]"
      />
      {/* Address */}
      <label htmlFor="address" className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Address
      </label>
      <textarea
        id="address"
        name="address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="p-2 border border-neutral-300 dark:border-neutral-700 
                   rounded-md bg-white dark:bg-neutral-800 min-h-[80px]"
      />

      {/* Date */}
      <label htmlFor="date" className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        Date
      </label>
      <input
        type="date"
        id="date"
        name="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="p-2 border border-neutral-300 dark:border-neutral-700 
                   rounded-md bg-white dark:bg-neutral-800
                   text-neutral-900 dark:text-neutral-100"
      />

      <button
        type="submit"
        className="
          p-2 bg-neutral-800 text-white rounded-md 
          hover:bg-neutral-700 transition
        "
      >
        Submit
      </button>
    </form>
  );
}
