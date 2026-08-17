type StatCardProps = {
  title: string;
  value: number;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow">
      <h3 className="text-gray-500">{title}</h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}