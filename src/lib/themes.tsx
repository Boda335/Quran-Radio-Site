import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ThemeId = "gold-night" | "emerald-night" | "royal-purple" | "midnight-blue" | "sunset-dark";

export interface ThemeDef {
  id: ThemeId;
  name: string;
  // Tailwind class for the swatch preview
  swatch: string;
}

export const THEMES: ThemeDef[] = [
  { id: "gold-night",    name: "Gold Night",    swatch: "from-yellow-400 to-amber-500" },
  { id: "emerald-night", name: "Emerald Night", swatch: "from-emerald-400 to-emerald-600" },
  { id: "royal-purple",  name: "Royal Purple",  swatch: "from-violet-400 to-violet-600" },
  { id: "midnight-blue", name: "Midnight Blue", swatch: "from-sky-400 to-blue-500" },
  { id: "sunset-dark",   name: "Sunset Dark",   swatch: "from-orange-400 to-red-500" },
];

interface ThemeCtx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);
const STORAGE_KEY = "qr.theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === "undefined") return "gold-night";
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    return saved && THEMES.some((t) => t.id === saved) ? saved : "gold-night";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    localStorage.setItem(STORAGE_KEY, t);
  };

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
