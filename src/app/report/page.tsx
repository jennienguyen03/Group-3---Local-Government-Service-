"use client";
import React from "react";

export default function Report() {
  return <AddIssues />;
}

function AddIssues() {
  const [form, setForm] = React.useState({
    title: "",
    category: "",
    description: "",
    date: ""
  });

  function handlesubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Form submitted");
  }

  return (
    <form
      onSubmit={handlesubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 
                 border border-neutral-300 dark:border-neutral-700 
                 rounded-lg flex flex-col gap-4"
    >
      <label htmlFor="title" className="text-sm font-medium">
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

      <label htmlFor="category" className="text-sm font-medium">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="p-2 border border-neutral-300 dark:border-neutral-700 
                   rounded-md bg-white dark:bg-neutral-800"
      >
        <option value="">Select a category</option>
        <option value="infrastructure">Pot Holes</option>
        <option value="environment">Grafitti</option>
        <option value="public-safety">Water Damage</option>
      </select>

      <label htmlFor="description" className="text-sm font-medium">
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

      <label htmlFor="date" className="text-sm font-medium">
        Date
      </label>
      <input
        type="date"
        id="date"
        name="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="p-2 border border-neutral-300 dark:border-neutral-700 
                   rounded-md bg-white dark:bg-neutral-800"
      />

      <button
        type="submit"
        className="p-2 bg-neutral-800 text-white rounded-md 
                   hover:bg-neutral-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
