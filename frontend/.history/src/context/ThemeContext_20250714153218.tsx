// src/context/ThemeContext.ts

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
