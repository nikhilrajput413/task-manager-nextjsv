type Props = {
  priority: string;
};

export default function TaskPriorityBadge({
  priority,
}: Props) {
  const colors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[
          priority as keyof typeof colors
        ] || "bg-gray-100"
      }`}
    >
      {priority}
    </span>
  );
}