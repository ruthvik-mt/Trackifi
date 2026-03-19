// src/components/Navbar.tsx
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { LogOut, Menu } from "lucide-react";

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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-card/80 backdrop-blur-md border-b border-border/50 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 z-20"
    >
      {/* Left side: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-xl bg-muted/50 text-foreground transition-all active:scale-90"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="space-y-0.5">
          <h1 className="font-black text-xl sm:text-2xl tracking-tight text-foreground">{title}</h1>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 sm:gap-6">
        <ThemeToggleButton />
        <button
          className="flex items-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 group"
          onClick={handleLogout}
        >
          <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </motion.header>
  );
}

