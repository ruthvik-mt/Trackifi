import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const location = useLocation();
  const [insightsOpen, setInsightsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/insights/")) {
      setInsightsOpen(true);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <span className="text-lg font-bold">Finance Tracker</span>
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:block`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="text-xl font-bold">Finance Tracker</div>
          <button
            className="text-white md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto pt-2">
          {[
            { to: "/dashboard", label: "Dashboard" },
            { to: "/categories", label: "Categories" },
            { to: "/transactions", label: "Transactions" },
            { to: "/budgets", label: "Budgets" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsSidebarOpen(false)}
              className={`block px-6 py-3 hover:bg-gray-700 ${
                location.pathname === to ? "bg-gray-700" : ""
              }`}
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => setInsightsOpen(!insightsOpen)}
            className={`w-full text-left px-6 py-3 hover:bg-gray-700 ${
              location.pathname.startsWith("/insights") ? "bg-gray-700" : ""
            }`}
          >
            Insights
          </button>

          {insightsOpen && (
            <div className="pl-8 text-sm space-y-1">
              {[
                { to: "/insights/monthly-total", label: "Monthly Total" },
                { to: "/insights/category-breakdown", label: "Category Breakdown" },
                { to: "/insights/budget-comparison", label: "Budget vs Actual" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                    location.pathname === to ? "bg-gray-700" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
