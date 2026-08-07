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
            mb-4
            rounded-md
            border border-neutral-300 dark:border-neutral-700
            px-4 py-2
            text-sm
            bg-white dark:bg-neutral-900
            hover:bg-neutral-100 dark:hover:bg-neutral-800
            transition
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
          fixed bottom-6 right-6
          rounded-full
          bg-neutral-800
          text-white
          w-10 h-10
          hover:bg-neutral-700
          transition
          shadow-md
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
    date: "",
  });


  function handlesubmit(event: React.FormEvent) {
    event.preventDefault();
    alert("Form submitted");
  }


  return (
    <form
      onSubmit={handlesubmit}
      className="
        flex flex-col gap-4
        max-w-lg w-full
        p-6
        rounded-lg
        border border-neutral-300 dark:border-neutral-700
        bg-white dark:bg-neutral-900
      "
    >

      <h1 className="text-xl font-semibold">
        Report an Issue
      </h1>


      <label htmlFor="title" className="text-sm font-medium">
        Title
      </label>

      <input
        type="text"
        id="title"
        name="title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="
          p-2 border border-neutral-300 dark:border-neutral-700
          rounded-md bg-white dark:bg-neutral-800
        "
      />


      <label htmlFor="category" className="text-sm font-medium">
        Category
      </label>

      <select
        id="category"
        name="category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="
          p-2 border border-neutral-300 dark:border-neutral-700
          rounded-md bg-white dark:bg-neutral-800
        "
      >
        <option value="">Select a category</option>
        <option value="infrastructure">Pot Holes</option>
        <option value="environment">Graffiti</option>
        <option value="public-safety">Water Damage</option>
      </select>


      <label htmlFor="description" className="text-sm font-medium">
        Description
      </label>

      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="
          p-2 border border-neutral-300 dark:border-neutral-700
          rounded-md bg-white dark:bg-neutral-800
          min-h-[80px]
        "
      />


      <label htmlFor="date" className="text-sm font-medium">
        Date
      </label>

      <input
        type="date"
        id="date"
        name="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
        className="
          p-2 border border-neutral-300 dark:border-neutral-700
          rounded-md bg-white dark:bg-neutral-800
        "
      />


      <button
        type="submit"
        className="
          p-2
          bg-neutral-800
          text-white
          rounded-md
          hover:bg-neutral-700
          transition
        "
      >
        Submit
      </button>

    </form>
  );
}