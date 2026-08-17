import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  User,
  Settings,
} from "lucide-react";

export const dashboardMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: FolderKanban,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];