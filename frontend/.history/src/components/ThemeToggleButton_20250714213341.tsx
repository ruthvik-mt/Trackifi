// src/components/ThemeToggleButton.tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-card text-card-foreground hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-inherit" />
      ) : (
        <Moon size={20} className="text-inherit" />
      )}
    </button>
  );
}
