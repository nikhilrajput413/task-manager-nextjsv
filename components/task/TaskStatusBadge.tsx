type Props = {
  status: string;
};

export default function TaskStatusBadge({
  status,
}: Props) {
  const colors = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    "In Progress":
      "bg-blue-100 text-blue-700",

    Completed:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[
          status as keyof typeof colors
        ] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
}