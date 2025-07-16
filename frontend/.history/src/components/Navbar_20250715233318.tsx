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
  onClick={() =>
    document.documentElement.classList.toggle("dark")
  }
  className="w-9 h-9 flex items-center justify-center rounded-md border border-muted bg-muted hover:bg-muted/70 transition-colors"
  aria-label="Toggle Theme"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-foreground transition-transform duration-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {document.documentElement.classList.contains("dark") ? (
      // Sun Icon (for dark mode)
      <circle cx="12" cy="12" r="5" />
    ) : (
      // Moon Icon (for light mode)
      <>
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </>
    )}
  </svg>
</button>

      </div>
    </motion.header>
  );
}
