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

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/categories", label: "Categories" },
  { to: "/transactions", label: "Transactions" },
  { to: "/budgets", label: "Budgets" },
  { to: "/insights", label: "Insights" },
  { to: "/insights/monthly-total", label: "Monthly Total" },
  { to: "/insights/category-breakdown", label: "Category Breakdown" },
  { to: "/insights/budget-comparison", label: "Budget vs Actual" },
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
