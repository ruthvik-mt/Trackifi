// src/components/ThemeToggleButton.tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center"
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
