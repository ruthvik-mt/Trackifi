// src/components/PublicNavbar.tsx
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export default function PublicNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-5 shadow-sm bg-card border-b border-border">
      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">💰 FinShape</div>
      <nav className="space-x-4 flex items-center">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted transition"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link
          to="/login"
          className="text-sm font-medium text-foreground hover:text-blue-700 transition"
        >
          Login
        </Link>
        <Link to="/register">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition">
            Get Started
          </button>
        </Link>
      </nav>
    </header>
  );
}
