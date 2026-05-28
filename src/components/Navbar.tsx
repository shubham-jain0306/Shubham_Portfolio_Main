import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Notes", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(() =>
    document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const glassBg = isLight
    ? "bg-black/[0.05] backdrop-blur-2xl backdrop-saturate-150 border border-black/[0.06]"
    : "bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.06]";

  const glassShadow = isLight
    ? "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.5)]"
    : "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]";

  const activePillBg = "bg-foreground/[0.08]";

  const dotGlowStyle = isLight
    ? { boxShadow: "0 0 8px 2px rgba(0,0,0,0.25)" }
    : { boxShadow: "0 0 10px 2px rgba(255,255,255,0.45)" };

  return (
    <nav
      className={`w-full z-50 transition-all duration-500 ease-out ${
        scrolled ? "fixed top-4 left-0 right-0 px-4 sm:px-8" : "relative"
      }`}
    >
      <div
        className={`max-w-[1200px] mx-auto transition-all duration-500 ease-out ${
          scrolled
            ? `${glassBg} rounded-full px-6 py-3 ${glassShadow} scale-100 animate-in fade-in zoom-in-95`
            : "border-b border-border px-6 sm:px-12 md:px-20 lg:px-6 py-4"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-sm tracking-wider font-medium text-foreground/90 hover:text-foreground"
          >
            Shubham
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-sm tracking-wide px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive(item.path)
                    ? `text-foreground ${activePillBg}`
                    : "text-muted-foreground hover:text-foreground/80 hover:bg-foreground/[0.04]"
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground/90"
                    style={dotGlowStyle}
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`md:hidden mt-2 mx-auto max-w-[1200px] transition-all duration-300 ${
            scrolled
              ? `${glassBg} rounded-2xl px-6 py-4`
              : "border-t border-border px-6 sm:px-12 py-4"
          } flex flex-col gap-4`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`text-sm tracking-wide transition-all duration-300 ${
                isActive(item.path)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
