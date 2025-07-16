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
      <div className="md:hidden flex items-center justify-between bg-card text-card-foreground p-4 border-b border-border shadow-sm">
        <span className="text-lg font-semibold">Finance Tracker</span>
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
        className={`fixed md:relative top-0 left-0 w-64 h-screen transform transition-transform z-40 bg-card text-card-foreground border-r border-border md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="text-xl font-bold">Finance Tracker</div>
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto pt-4 text-sm">
          <div className="space-y-3 px-2">
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
                className={`block px-4 py-2 rounded-md transition-colors hover:bg-muted ${
                  location.pathname === to ? "bg-muted font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t my-5 border-border" />

          {/* Insights Parent */}
          <div className="space-y-2 px-2">
  <button
    onClick={() => setInsightsOpen(!insightsOpen)}
    className={`w-full text-left px-4 py-2 rounded-md transition-colors
      text-foreground hover:bg-muted ${location.pathname.startsWith("/insights") ? "bg-muted font-semibold" : ""}`}>
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
