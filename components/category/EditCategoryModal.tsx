"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

type Props = {
  category: {
    id: number;
    name: string;
    color: string | null;
  };
};

export default function EditCategoryModal({
  category,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(category.name);

  const [color, setColor] = useState(
    category.color || "#3b82f6"
  );

  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category Name is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/categories",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: category.id,
            name,
            color,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert(
        "Category Updated Successfully"
      );

      setOpen(false);

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
        className="text-blue-600 hover:text-blue-800"
      >
        <Pencil size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl w-[500px] p-6">

            <h2 className="text-2xl font-bold mb-6">
              Edit Category
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Category Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Category Color
                </label>

                <input
                  type="color"
                  value={color}
                  onChange={(e) =>
                    setColor(
                      e.target.value
                    )
                  }
                  className="w-20 h-12 border rounded"
                />
              </div>

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="border px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  {loading
                    ? "Updating..."
                    : "Update Category"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}