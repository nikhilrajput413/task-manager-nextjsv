import StatCard from "./StatCard";

export default function StatsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Total Tasks" value={20} />
      <StatCard title="Completed" value={12} />
      <StatCard title="Pending" value={6} />
      <StatCard title="Overdue" value={2} />
    </div>
  );
}