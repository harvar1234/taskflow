import {
  useEffect,
  useState,
} from "react";

import {
  FolderKanban,
  ListTodo,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

import {
  getCurrentUser,
} from "../services/authService";

import {
  getDashboardStats,
} from "../services/dashboardService";


export default function Dashboard() {
  const [user, setUser] =
    useState<any>(null);

  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const [
      userData,
      statsData,
    ] = await Promise.all([
      getCurrentUser(),
      getDashboardStats(),
    ]);

    setUser(userData);
    setStats(statsData);
  };

  if (!stats) {
    return (
      <div className="text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Projects",
      value: stats.total_projects,
      icon: <FolderKanban size={26} />,
    },
    {
      title: "Total Tasks",
      value: stats.total_tasks,
      icon: <ClipboardList size={26} />,
    },
    {
      title: "To Do",
      value: stats.todo_tasks,
      icon: <ListTodo size={26} />,
    },
    {
      title: "In Progress",
      value: stats.in_progress_tasks,
      icon: <Clock3 size={26} />,
    },
    {
      title: "Completed",
      value: stats.completed_tasks,
      icon: <CheckCircle2 size={26} />,
    },
    {
      title: "High Priority",
      value: stats.high_priority_tasks,
      icon: <AlertTriangle size={26} />,
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold">
          Welcome back
          {user
            ? `, ${user.full_name}`
            : ""}
          👋
        </h2>

        <p className="text-slate-500 mt-2">
          Here's your TaskFlow overview.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white border rounded-xl shadow-sm p-6"
          >

            <div className="flex justify-between items-center">

              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <p className="text-3xl font-bold mt-2">
                  {card.value}
                </p>
              </div>

              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                {card.icon}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}