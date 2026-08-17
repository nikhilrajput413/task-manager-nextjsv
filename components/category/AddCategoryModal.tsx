"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryModal() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category Name is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          color,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        setLoading(false);
        return;
      }

      alert("Category Created Successfully");

      setOpen(false);
      setName("");
      setColor("#3b82f6");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
      >
        + Add Category
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[500px] p-6">

            <h2 className="text-2xl font-bold mb-6">
              Add Category
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Category Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Category Color
                </label>

                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-20 h-12 border rounded cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="border px-5 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Category"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}