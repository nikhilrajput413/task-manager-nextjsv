"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

export default function AddTaskModal() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [categoryid, setCategoryId] =
    useState("");
  const [priority, setPriority] =
    useState("Medium");
  const [status, setStatus] =
    useState("Pending");
  const [duedate, setDueDate] =
    useState("");
  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");

      const data = await res.json();

      setCategories(data);
    }

    loadCategories();
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task Title is required.");
      return;
    }

    if (!categoryid) {
      alert("Please select category.");
      return;
    }

    setLoading(true);

    const response = await fetch(
      "/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          categoryid,
          priority,
          status,
          duedate,
          notes,
        }),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      alert(result.message);
      setLoading(false);
      return;
    }

    alert("Task Created Successfully");

    setOpen(false);

    router.refresh();

    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
      >
        + Add Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl w-[700px] p-8">

            <h2 className="text-3xl font-bold mb-8">
              Add Task
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-5"
            >

              <div className="col-span-2">

                <label>
                  Task Title
                </label>

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-2"
                />

              </div>

              <div className="col-span-2">

                <label>
                  Description
                </label>

                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-2"
                />

              </div>

              <div>

                <label>
                  Category
                </label>

                <select
                  value={categoryid}
                  onChange={(e) =>
                    setCategoryId(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-2"
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.id}
                        value={
                          category.id
                        }
                      >
                        {category.name}
                      </option>
                    )
                  )}

                </select>

              </div>

              <div>

                <label>
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-2"
                >

                  <option>
                    Low
                  </option>

                  <option>
                    Medium
                  </option>

                  <option>
                    High
                  </option>

                </select>

              </div>

              <div>

                <label>
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-2"
                >

                  <option>
                    Pending
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Completed
                  </option>

                </select>

              </div>

              <div>

                <label>
                  Due Date
                </label>

                <input
                  type="date"
                  value={duedate}
                  onChange={(e) =>
                    setDueDate(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-2"
                />

              </div>

              <div className="col-span-2">

                <label>
                  Notes
                </label>

                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) =>
                    setNotes(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg p-3 mt-2"
                />

              </div>

              <div className="col-span-2 flex justify-end gap-3 mt-5">

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="border px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  {loading
                    ? "Saving..."
                    : "Save Task"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}