"use client";

import React from "react";
import { useRouter } from "next/navigation";
import UserNavbar from "~/components/UserNavbar";

export default function Report({
  canManageCategories,
}: {
  canManageCategories: boolean;
}) {
  const router = useRouter();

  const [form, setForm] = React.useState({
    name: "",
    type: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
  });

  const [isEditorOpen, setIsEditorOpen] = React.useState(false);

  const [categories, setCategories] = React.useState([  // prefill the categories with the values
    "POTHOLE",
    "GRAFFITI",
    "ILLEGAL_DUMPING",
    "DAMAGED_PLAYGROUND_EQUIPMENT",
    "BROKEN_STREETLIGHT",
    "OVERGROWN_VEGETATION",
    "WATER_LEAK",
    "FOOTPATH_DAMAGE",
    "OTHER",
  ]);

  const [newCategory, setNewCategory] = React.useState(""); // state for the new category input

  function addCategory() {       
    if (!newCategory) return;

    const formatted = newCategory.toUpperCase();    //add category

    if (categories.includes(formatted)) return;

    setCategories([...categories, formatted]);     // load the new category into the list
    setNewCategory("");
  }

  function removeCategory(cat: string) {
    setCategories(categories.filter((c) => c !== cat));  // remove category
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) { // convert the form data to JSON and send it to the server
    event.preventDefault();

    const res = await fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },   
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Issue submitted successfully");
      setForm({
        name: "",
        type: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
      });
    } else {
      alert("Failed to submit issue");
    }
  }

  return (        //html for the report page
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <UserNavbar />

      <main className="p-6">
        <button
          onClick={() => router.back()}
          className="mb-4 rounded-md border px-4 py-2 text-sm"
        >
          ← Back
        </button>

        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-lg w-full p-6 rounded-lg border bg-white"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Report an Issue</h1>

              {canManageCategories && (
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(!isEditorOpen)}
                  className="rounded-md border px-3 py-1.5 text-xs font-medium"
                >
                  {isEditorOpen ? "Close Editor" : "Edit Issue Types"}
                </button>
              )}
            </div>

            {isEditorOpen && canManageCategories && (
              <div className="border rounded-md p-3">
                <p className="text-sm font-medium mb-2">Category Editor</p>

                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="p-2 border rounded-md"
                  />

                  <button
                    type="button"
                    onClick={addCategory}
                    className="p-2 bg-neutral-800 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-col gap-2 mt-3">    // added a delete category function for the list
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between border p-2 rounded-md"
                    >
                      <span className="text-sm">{cat}</span>

                      <button
                        type="button"
                        onClick={() => removeCategory(cat)}
                        className="px-2 py-1 bg-red-600 text-white rounded-md text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-2 border rounded-md"
            />

            <label className="text-sm font-medium">Category</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="p-2 border rounded-md"
            >
              <option value="">Select Category</option>  // added a load function that adds the categories into the dropdown list 
              {categories.map((cat) => (                 // dynamically loads the categories into the dropdown list
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className="text-sm font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="p-2 border rounded-md min-h-[80px]"
            />

            <label className="text-sm font-medium">Address</label>
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="p-2 border rounded-md min-h-[80px]"
            />
            <button
              type="submit"
              className="p-2 bg-neutral-800 text-white rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
