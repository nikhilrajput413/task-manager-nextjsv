import AddTaskModal from "@/components/task/AddTaskModal";
import { prisma } from "@/lib/prisma";
import TaskPriorityBadge from "@/components/task/TaskPriorityBadge";
import TaskStatusBadge from "@/components/task/TaskStatusBadge";
import EditTaskModal from "@/components/task/EditTaskModal";
import DeleteTaskButton from "@/components/task/DeleteTaskButton";
import TaskFilters from "@/components/task/TaskFilters";

export default async function TasksPage({ searchParams }: any) {

  //  FIX (Next.js latest)
  const params = await searchParams;

  const filters: any = {};

  //  STATUS
  if (params.status && params.status !== "") {
    filters.status = params.status;
  }

  //  PRIORITY
  if (params.priority && params.priority !== "") {
    filters.priority = params.priority;
  }

  // CATEGORY
  if (params.categoryid && params.categoryid !== "") {
    filters.categoryid = Number(params.categoryid);
  }

  //  SEARCH
  if (params.search && params.search !== "") {
    filters.title = {
      contains: params.search,
      mode: "insensitive",
    };
  }

  //  DATE FILTER
  if (params.from || params.to) {
    filters.duedate = {};

    if (params.from) {
      filters.duedate.gte = new Date(params.from);
    }

    if (params.to) {
      filters.duedate.lte = new Date(params.to);
    }
  }

  console.log("FILTERS:", filters);

  const tasks = await prisma.tasks.findMany({
    where: filters,
    include: {
      categories: true,
      users: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  console.log("RESULT:", tasks.length);
  const categories = await prisma.categories.findMany();

  return (

    <>
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-gray-500 mt-1">
            Manage your daily tasks
          </p>
        </div>

        <AddTaskModal />
      </div>

      {/* Filters */}
       <TaskFilters categories={categories} />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">ID</th>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Due Date</th>
              <th className="text-left p-4">User</th>
              <th className="text-center p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-20 text-center">
                  <h2 className="text-2xl font-semibold text-gray-600">
                    No Tasks Found
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Try changing filters or add a new task.
                  </p>
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{task.id}</td>

                  <td className="px-6 py-4 font-medium">
                    {task.title}
                  </td>

                  <td className="px-6 py-4">
                    {task.categories?.name || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <TaskPriorityBadge priority={task.priority} />
                  </td>

                  <td className="px-6 py-4">
                    <TaskStatusBadge status={task.status} />
                  </td>

                  <td className="px-6 py-4">
                    {task.duedate
                      ? new Date(task.duedate).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* <td className="px-6 py-4">
                    {task.users?.name || "-"}
                  </td> */}

                  <td className="px-6 py-4 flex justify-center gap-3">
                    <EditTaskModal task={task} />
                    <DeleteTaskButton id={task.id} />
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
    </>
  );
}