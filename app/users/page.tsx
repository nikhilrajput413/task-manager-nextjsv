import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.users.findMany();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      {users.length === 0 ? (
        <p>No Users Found</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded mb-3"
          >
            {/* <h2>{user.name}</h2> */}

            <p>{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
}