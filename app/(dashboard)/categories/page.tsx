import { prisma } from "@/lib/prisma";
import AddCategoryModal from "@/components/category/AddCategoryModal";
import EditCategoryModal from "@/components/category/EditCategoryModal";
import DeleteCategoryButton from "@/components/category/DeleteCategoryButton";
import CategoryFilters from "@/components/category/CategoryFilters";

export default async function CategoriesPage(props: any) {

  const searchParams = await props.searchParams; // 🔥 IMPORTANT

  const filters: any[] = [];

  // 🔍 SEARCH FILTER
  if (searchParams.search) {
    filters.push({
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    });
  }

  console.log("CATEGORY FILTERS:", filters);

  const categories = await prisma.categories.findMany({
    where: {
      AND: filters,
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-500 mt-1">
            Manage your task categories
          </p>
        </div>

        <AddCategoryModal />
      </div>

      {/* 🔥 FILTERS */}
      <CategoryFilters />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Color</th>
              <th className="text-left p-4">Created</th>
              <th className="text-center p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <h2 className="text-2xl font-semibold text-gray-600">
                    No Categories Found
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Click on Add Category to create your first category.
                  </p>
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    {category.id}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {category.name}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-full border"
                        style={{
                          backgroundColor:
                            category.color || "#808080",
                        }}
                      />
                      {category.color}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {category.createdat
                      ? new Date(category.createdat).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* 🔥 ACTION */}
                  <td className="px-6 py-4 flex justify-center gap-4">

                    <EditCategoryModal category={category} />

                    <DeleteCategoryButton id={category.id} />

                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}