// src/components/Navbar.tsx
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface NavbarProps {
  toggleSidebar: () => void;
  title?: string;
}

export default function Navbar({ toggleSidebar, title = "Home" }: NavbarProps) {
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
      className="bg-card text-card-foreground border-none shadow-none h-16 flex items-center justify-between px-4 md:px-6 transition-none"
    >
      {/* Left side: Hamburger + Title (closer on mobile) */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          className="md:hidden focus:outline-none p-2 rounded-md bg-black dark:bg-white"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <svg
            className="w-6 h-6 text-white dark:text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="font-semibold text-lg">{title}</div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
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

