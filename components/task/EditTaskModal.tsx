"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

type Category = {
  id: number;
  name: string;
};

type Task = {
  id: number;
  title: string;
  description: string | null;
  categoryid: number | null;
  priority: string;
  status: string;
  duedate: Date | null;
  notes: string | null;
};

export default function EditTaskModal({
  task,
}: {
  task: Task;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [title, setTitle] = useState(task.title);

  const [description, setDescription] = useState(
    task.description || ""
  );

  const [categoryid, setCategoryId] = useState(
    task.categoryid?.toString() || ""
  );

  const [priority, setPriority] = useState(
    task.priority
  );

  const [status, setStatus] = useState(
    task.status
  );

  const [duedate, setDueDate] = useState(
    task.duedate
      ? new Date(task.duedate)
          .toISOString()
          .split("T")[0]
      : ""
  );

  const [notes, setNotes] = useState(
    task.notes || ""
  );

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch(
        "/api/categories"
      );

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

    try {
      const response = await fetch(
        "/api/tasks",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id: task.id,
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

      alert(
        "Task Updated Successfully"
      );

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    }

    setLoading(false);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="w-[700px] rounded-xl bg-white p-8 shadow-xl">

            <h2 className="mb-8 text-3xl font-bold">
              Edit Task
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-5"
            >

              {/* Task Title */}

              <div className="col-span-2">

                <label className="font-medium">
                  Task Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="mt-2 w-full rounded-lg border p-3"
                />

              </div>

              {/* Description */}

              <div className="col-span-2">

                <label className="font-medium">
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
                  className="mt-2 w-full rounded-lg border p-3"
                />

              </div>

              {/* Category */}

              <div>

                <label className="font-medium">
                  Category
                </label>

                <select
                  value={categoryid}
                  onChange={(e) =>
                    setCategoryId(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-lg border p-3"
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Priority */}

              <div>

                <label className="font-medium">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-lg border p-3"
                >

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                </select>

              </div>

              {/* Status */}

              <div>

                <label className="font-medium">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-lg border p-3"
                >

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

              {/* Due Date */}

              <div>

                <label className="font-medium">
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
                  className="mt-2 w-full rounded-lg border p-3"
                />

              </div>

              {/* Notes */}

              <div className="col-span-2">

                <label className="font-medium">
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
                  className="mt-2 w-full rounded-lg border p-3"
                />

              </div>

              {/* Buttons */}

              <div className="col-span-2 mt-5 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="rounded-lg border px-6 py-3"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading
                    ? "Updating..."
                    : "Update Task"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}