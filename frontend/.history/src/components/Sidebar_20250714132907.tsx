import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react"; // Or use any hamburger icon you like

export default function Sidebar() {
  const location = useLocation();
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-expand insights section if a subroute is active
  useEffect(() => {
    if (location.pathname.startsWith("/insights/")) {
      setInsightsOpen(true);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Hamburger Toggle on Mobile */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <span className="text-lg font-bold">Finance Tracker</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Drawer (mobile + desktop) */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:flex`}
      >
        <div className="text-2xl font-bold p-6 border-b border-gray-700 hidden md:block">
          Finance Tracker
        </div>
        <nav className="flex-1 overflow-y-auto pt-4">
          <Link
            to="/dashboard"
            className={`block px-6 py-3 hover:bg-gray-700 ${
              location.pathname === "/dashboard" ? "bg-gray-700" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/categories"
            className={`block px-6 py-3 hover:bg-gray-700 ${
              location.pathname === "/categories" ? "bg-gray-700" : ""
            }`}
          >
            Categories
          </Link>
          <Link
            to="/transactions"
            className={`block px-6 py-3 hover:bg-gray-700 ${
              location.pathname === "/transactions" ? "bg-gray-700" : ""
            }`}
          >
            Transactions
          </Link>
          <Link
            to="/budgets"
            className={`block px-6 py-3 hover:bg-gray-700 ${
              location.pathname === "/budgets" ? "bg-gray-700" : ""
            }`}
          >
            Budgets
          </Link>

          {/* Insights Parent */}
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
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === "/insights/monthly-total" ? "bg-gray-700" : ""
                }`}
              >
                Monthly Total
              </Link>
              <Link
                to="/insights/category-breakdown"
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === "/insights/category-breakdown" ? "bg-gray-700" : ""
                }`}
              >
                Category Breakdown
              </Link>
              <Link
                to="/insights/budget-comparison"
                className={`block px-4 py-2 rounded hover:bg-gray-700 ${
                  location.pathname === "/insights/budget-comparison" ? "bg-gray-700" : ""
                }`}
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
