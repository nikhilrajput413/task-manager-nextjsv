import Link from "next/link";

export default function NewCategoryPage() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Add Category
        </h1>

        <Link
          href="/categories"
          className="text-blue-600"
        >
          Back
        </Link>
      </div>

      <form className="space-y-4">

        <div>
          <label className="block mb-2 font-medium">
            Category Name
          </label>

          <input
            type="text"
            className="w-full border rounded p-3"
            placeholder="Work"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Color
          </label>

          <input
            type="text"
            className="w-full border rounded p-3"
            placeholder="Blue"
          />
        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Category
        </button>

      </form>

    </div>
  );
}