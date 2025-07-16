import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

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

  const linkStyle = (path: string) =>
    `block px-6 py-3 hover:bg-gray-700 ${
      location.pathname === path ? "bg-gray-700" : ""
    }`;

  const subLinkStyle = (path: string) =>
    `block px-4 py-2 rounded hover:bg-gray-700 ${
      location.pathname === path ? "bg-gray-700" : ""
    }`;

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <span className="text-lg font-bold">Finance Tracker</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:relative md:flex`}
      >
        <div className="text-2xl font-bold p-6 border-b border-gray-700 hidden md:block">
          Finance Tracker
        </div>
        <nav className="flex-1 overflow-y-auto pt-4">
          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            Dashboard
          </Link>
          <Link to="/categories" className={linkStyle("/categories")}>
            Categories
          </Link>
          <Link to="/transactions" className={linkStyle("/transactions")}>
            Transactions
          </Link>
          <Link to="/budgets" className={linkStyle("/budgets")}>
            Budgets
          </Link>

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
              <Link
                to="/insights/monthly-total"
                className={subLinkStyle("/insights/monthly-total")}
              >
                Monthly Total
              </Link>
              <Link
                to="/insights/category-breakdown"
                className={subLinkStyle("/insights/category-breakdown")}
              >
                Category Breakdown
              </Link>
              <Link
                to="/insights/budget-comparison"
                className={subLinkStyle("/insights/budget-comparison")}
              >
                Budget vs Actual
              </Link>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
