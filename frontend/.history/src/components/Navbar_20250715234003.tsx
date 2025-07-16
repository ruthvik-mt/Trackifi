// src/components/Navbar.tsx
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("You've been logged out");
    navigate("/");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card text-card-foreground border-b border-transparent shadow-sm h-16 flex items-center justify-between px-4 md:px-6"
    >
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
      <div className="gap-4 px-2 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center">
        <ThemeToggleButton />
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </motion.header>
  );
}
