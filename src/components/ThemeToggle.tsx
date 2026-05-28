import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark" | "system";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const applyTheme = (theme: Theme) => {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  if (resolved === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as Theme) || "dark";
  });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen for system preference changes when theme is "system"
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const resolved = theme === "system" ? getSystemTheme() : theme;
  const isDark = resolved === "dark";

  const toggle = () => {
    setAnimate(true);
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => setAnimate(false), 400);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="ml-2 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
    >
      <span
        className={`block transition-transform duration-400 ${animate ? "rotate-180 scale-75 opacity-60" : "rotate-0 scale-100 opacity-100"}`}
        style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
