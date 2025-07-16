// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-blue-600 font-bold" : "text-gray-700";

  return (
    <aside className="w-48 bg-gray-100 p-4 min-h-screen">
      <nav className="space-y-3">
        <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
        <NavLink to="/categories" className={navLinkClass}>Categories</NavLink>
        <NavLink to="/transactions" className={navLinkClass}>Transactions</NavLink>
        <NavLink to="/budgets" className={navLinkClass}>Budgets</NavLink>
        <NavLink to="/insights" className={navLinkClass}>Insights</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
