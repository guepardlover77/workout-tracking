import { NavLink, Outlet } from "react-router-dom";
import { Dumbbell, Calendar, CalendarDays, LayoutTemplate } from "lucide-react";

const navItems = [
  { to: "/workouts", label: "Séances", icon: Calendar },
  { to: "/calendar", label: "Calendrier", icon: CalendarDays },
  { to: "/exercises", label: "Exercices", icon: Dumbbell },
  { to: "/templates", label: "Programmes", icon: LayoutTemplate },
];

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-6 h-14">
          <span className="font-bold text-blue-600 text-lg">💪 Workout</span>
          <nav className="flex gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
