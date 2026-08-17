"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteTaskButton({
  id,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `/api/tasks?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert("Task Deleted Successfully");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800"
      title="Delete Task"
    >
      <Trash2 size={18} />
    </button>
  );
}