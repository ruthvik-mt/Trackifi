// src/components/ThemeToggleButton.tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-card text-card-foreground hover:bg-muted transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle Theme"
    >
      <span className="flex items-center justify-center transition-opacity duration-200">
        {theme === "dark" ? (
          <Sun size={20} className="text-inherit" />
        ) : (
          <Moon size={20} className="text-inherit" />
        )}
      </span>
    </button>
  );
}
