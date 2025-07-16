// // src/components/Sidebar.tsx
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   const navLinkClass = ({ isActive }: { isActive: boolean }) =>
//     isActive ? "text-blue-600 font-bold" : "text-gray-700";

//   return (
//     <aside className="w-48 bg-gray-100 p-4 min-h-screen">
//       <nav className="space-y-3">
//         <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
//         <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>
//         <NavLink to="/transactions" className={navLinkClass}>Transactions</NavLink>
//         <NavLink to="/budgets" className={navLinkClass}>Budgets</NavLink>
//         <NavLink to="/insights" className={navLinkClass}>Insights</NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [insightsOpen, setInsightsOpen] = useState(false);

  // Auto-expand insights section if a subroute is active
  useEffect(() => {
    if (
      location.pathname.startsWith("/insights/")
    ) {
      setInsightsOpen(true);
    }
  }, [location.pathname]);

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Finance Tracker
      </div>
      <nav className="flex-1">
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

        {/* Sub-links, shown only if expanded */}
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
  );
}
