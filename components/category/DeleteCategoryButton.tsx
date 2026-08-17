"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

export default function DeleteCategoryButton({ id }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    const response = await fetch(
      `/api/categories?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      alert("Failed to delete category.");
      return;
    }

    alert("Category Deleted Successfully");

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800"
    >
      <Trash2 size={18} />
    </button>
  );
}