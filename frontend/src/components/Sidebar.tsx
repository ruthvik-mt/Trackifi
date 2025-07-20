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
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between bg-card text-card-foreground p-4 border-b border-none shadow-sm transition-none">
        <span className="text-lg font-semibold">Trackifi</span>
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 w-64 h-screen transform transition-transform z-40 bg-card text-card-foreground border-r border-none md:translate-x-0 transition-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-none transition-none">
          <div className="text-xl font-bold">Trackifi</div>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto pt-4 text-sm">
          <div className="space-y-3 px-2">
            {[
              { to: "/dashboard", label: "Home" },
              { to: "/categories", label: "Categories" },
              { to: "/budgets", label: "Budgets" },
              { to: "/transactions", label: "Transactions" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsSidebarOpen(false)}
                className={`block px-4 py-2 rounded-md transition-colors hover:bg-muted ${
                  location.pathname === to ? "bg-muted font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t my-5 border-none" />

          {/* Insights Parent */}
          <div className="space-y-2 px-2">
            <button
              onClick={() => setInsightsOpen(!insightsOpen)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors text-gray-900 dark:text-gray-100 hover:text-white dark:hover:text-black bg-transparent ${
                location.pathname.startsWith("/insights") ? "bg-gray-200 font-semibold dark:bg-gray-700" : ""
              }`}
            >
              Insights
            </button>

            {/* Insights Sub-links */}
            {insightsOpen && (
              <div className="pl-4 mt-2 space-y-2 text-sm">
                {[
                  { to: "/insights/monthly-total", label: "Monthly Total" },
                  { to: "/insights/category-breakdown", label: "Category Breakdown" },
                  { to: "/insights/budget-comparison", label: "Budget vs Actual" },
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block px-4 py-2 rounded-md transition-colors hover:bg-muted ${
                      location.pathname === to ? "bg-muted font-semibold" : ""
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
