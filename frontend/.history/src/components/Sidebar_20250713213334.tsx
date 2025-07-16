import { Link, useLocation } from "react-router-dom";
{ to: "/insights/monthly-total", label: "Monthly Total" },
{ to: "/insights/category-breakdown", label: "Breakdown" },
{ to: "/insights/budget-comparison", label: "Budget vs Actual" },


const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/categories", label: "Categories" },
  { to: "/transactions", label: "Transactions" },
  { to: "/budgets", label: "Budgets" },
  { to: "/insights", label: "Insights" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">Finance Tracker</div>
      <nav className="flex-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`block px-6 py-3 hover:bg-gray-700 ${
              location.pathname.startsWith(link.to) ? "bg-gray-700" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
