// // src/components/Navbar.tsx
// import { useAuth } from "@/hooks/useAuth";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <header className="flex justify-between items-center bg-white p-4 border-b">
//       <h1 className="text-xl font-bold">Finance Tracker</h1>
//       <div className="flex items-center space-x-4">
//         {user && <span className="text-gray-700">Hello, {user.name}</span>}
//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-3 py-1 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 md:px-6">
      {/* Mobile: Sidebar toggle */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Title */}
      <div className="font-semibold text-lg">Dashboard</div>

      {/* Logout */}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}

