export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Agar dashboard specific header chahiye to yaha add karo */}
      {children}
    </div>
  );
}