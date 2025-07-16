// src/components/Navbar.tsx
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import toast from "react-hot-toast";

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
    <header className="bg-card text-card-foreground border-b border-border shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
      {/* Mobile: Sidebar toggle */}
      <button
        className="md:hidden focus:outline-none hover:bg-muted rounded-md p-2"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6 text-foreground"
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

      {/* Right actions */}
      <div className="flex items-center gap-4">
        <ThemeToggleButton />
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-md transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
