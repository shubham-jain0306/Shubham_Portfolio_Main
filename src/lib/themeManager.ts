import defaultThemeConfig from "@/data/themeConfig.json";

export interface ThemePalette {
  id: string;
  name: string;
  category: "required" | "light" | "dark" | "cyber";
  description: string;
  isLight: boolean;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    ring: string;
  };
  preview: {
    bg: string;
    text: string;
    accent: string;
    secondary: string;
    border: string;
  };
  meshBlobs: [number, number, number][];
}

export const THEME_PALETTES: ThemePalette[] = [
  // 1. Ivory + Charcoal + Terracotta
  {
    id: "ivory-charcoal-terracotta",
    name: "Ivory + Charcoal + Terracotta",
    category: "required",
    description: "Warm ivory canvas paired with deep charcoal typography and rustic terracotta accents.",
    isLight: true,
    colors: {
      background: "38 45% 97%",
      foreground: "210 8% 14%",
      card: "38 35% 93%",
      cardForeground: "210 8% 14%",
      popover: "38 45% 97%",
      popoverForeground: "210 8% 14%",
      primary: "15 68% 50%",
      primaryForeground: "0 0% 100%",
      secondary: "38 25% 90%",
      secondaryForeground: "210 8% 14%",
      muted: "38 25% 90%",
      mutedForeground: "210 6% 45%",
      accent: "15 68% 50%",
      accentForeground: "0 0% 100%",
      border: "38 18% 84%",
      ring: "15 68% 50%",
    },
    preview: {
      bg: "#FAF7F2",
      text: "#212427",
      accent: "#D4542B",
      secondary: "#F2ECE2",
      border: "#DDD4C5",
    },
    meshBlobs: [
      [240, 230, 215],
      [230, 190, 170],
      [245, 238, 225],
      [215, 170, 150],
    ],
  },

  // 2. Off-white + Deep Green + Charcoal
  {
    id: "offwhite-deepgreen-charcoal",
    name: "Off-white + Deep Green + Charcoal",
    category: "required",
    description: "Clean off-white backdrop grounded in architectural charcoal and rich forest emerald.",
    isLight: true,
    colors: {
      background: "210 16% 98%",
      foreground: "160 10% 14%",
      card: "150 18% 94%",
      cardForeground: "160 10% 14%",
      popover: "210 16% 98%",
      popoverForeground: "160 10% 14%",
      primary: "154 48% 22%",
      primaryForeground: "0 0% 100%",
      secondary: "150 14% 90%",
      secondaryForeground: "160 10% 14%",
      muted: "150 14% 90%",
      mutedForeground: "160 8% 46%",
      accent: "154 48% 22%",
      accentForeground: "0 0% 100%",
      border: "150 12% 86%",
      ring: "154 48% 22%",
    },
    preview: {
      bg: "#F8F9FA",
      text: "#202623",
      accent: "#1D533C",
      secondary: "#EDF3F0",
      border: "#D8E3DD",
    },
    meshBlobs: [
      [225, 235, 230],
      [200, 225, 215],
      [235, 242, 238],
      [180, 215, 200],
    ],
  },

  // 3. Warm White + Burgundy + Charcoal
  {
    id: "warmwhite-burgundy-charcoal",
    name: "Warm White + Burgundy + Charcoal",
    category: "required",
    description: "Opulent alabaster white with deep charcoal body and luxurious bordeaux burgundy highlights.",
    isLight: true,
    colors: {
      background: "36 32% 98%",
      foreground: "228 8% 13%",
      card: "350 18% 94%",
      cardForeground: "228 8% 13%",
      popover: "36 32% 98%",
      popoverForeground: "228 8% 13%",
      primary: "350 52% 32%",
      primaryForeground: "0 0% 100%",
      secondary: "350 14% 90%",
      secondaryForeground: "228 8% 13%",
      muted: "350 14% 90%",
      mutedForeground: "350 8% 46%",
      accent: "350 52% 32%",
      accentForeground: "0 0% 100%",
      border: "350 12% 86%",
      ring: "350 52% 32%",
    },
    preview: {
      bg: "#FCFAF7",
      text: "#1E2024",
      accent: "#7C2735",
      secondary: "#F6EEEE",
      border: "#E5D8DA",
    },
    meshBlobs: [
      [245, 230, 232],
      [235, 205, 210],
      [250, 240, 242],
      [220, 180, 190],
    ],
  },

  // 4. Black + White + muted Gold
  {
    id: "black-white-mutedgold",
    name: "Black + White + Muted Gold",
    category: "required",
    description: "Deep obsidian black with crisp white readability and prestigious brushed champagne gold.",
    isLight: false,
    colors: {
      background: "240 6% 4%",
      foreground: "0 0% 100%",
      card: "240 5% 8%",
      cardForeground: "0 0% 100%",
      popover: "240 5% 8%",
      popoverForeground: "0 0% 100%",
      primary: "42 54% 56%",
      primaryForeground: "240 6% 4%",
      secondary: "240 4% 13%",
      secondaryForeground: "0 0% 95%",
      muted: "240 4% 13%",
      mutedForeground: "42 12% 60%",
      accent: "42 54% 56%",
      accentForeground: "240 6% 4%",
      border: "42 20% 20%",
      ring: "42 54% 56%",
    },
    preview: {
      bg: "#0A0A0B",
      text: "#FFFFFF",
      accent: "#D2AC4C",
      secondary: "#131316",
      border: "#3D3524",
    },
    meshBlobs: [
      [25, 22, 16],
      [40, 34, 20],
      [15, 14, 16],
      [50, 42, 22],
    ],
  },

  // 5. Pure black + neon/bright accent
  {
    id: "pureblack-neon-accent",
    name: "Pure Black + Neon Accent",
    category: "required",
    description: "True OLED pitch black electrified with ultra-vivid cyber cyan and high-voltage contrast.",
    isLight: false,
    colors: {
      background: "0 0% 0%",
      foreground: "180 20% 98%",
      card: "0 0% 6%",
      cardForeground: "180 20% 98%",
      popover: "0 0% 6%",
      popoverForeground: "180 20% 98%",
      primary: "175 100% 50%",
      primaryForeground: "0 0% 0%",
      secondary: "0 0% 11%",
      secondaryForeground: "180 20% 98%",
      muted: "0 0% 11%",
      mutedForeground: "175 25% 65%",
      accent: "175 100% 50%",
      accentForeground: "0 0% 0%",
      border: "175 60% 18%",
      ring: "175 100% 50%",
    },
    preview: {
      bg: "#000000",
      text: "#F7FEFE",
      accent: "#00FFD5",
      secondary: "#0F0F0F",
      border: "#124B43",
    },
    meshBlobs: [
      [0, 35, 30],
      [5, 45, 40],
      [2, 15, 15],
      [0, 50, 45],
    ],
  },

  // 6. Midnight Navy + Silver Slate
  {
    id: "midnight-navy-silver",
    name: "Midnight Navy + Silver Slate",
    category: "dark",
    description: "Deep twilight oceanic blue paired with refined silver-white and electric cobalt accents.",
    isLight: false,
    colors: {
      background: "222 47% 7%",
      foreground: "210 20% 96%",
      card: "222 40% 12%",
      cardForeground: "210 20% 96%",
      popover: "222 40% 12%",
      popoverForeground: "210 20% 96%",
      primary: "217 91% 60%",
      primaryForeground: "0 0% 100%",
      secondary: "222 35% 17%",
      secondaryForeground: "210 20% 96%",
      muted: "222 35% 17%",
      mutedForeground: "215 20% 65%",
      accent: "217 91% 60%",
      accentForeground: "0 0% 100%",
      border: "222 30% 22%",
      ring: "217 91% 60%",
    },
    preview: {
      bg: "#0A0F1D",
      text: "#F1F5F9",
      accent: "#3B82F6",
      secondary: "#121B30",
      border: "#27385E",
    },
    meshBlobs: [
      [10, 25, 55],
      [15, 40, 85],
      [8, 18, 40],
      [20, 50, 100],
    ],
  },

  // 7. Nordic Slate & Arctic Blue
  {
    id: "nordic-slate-arctic",
    name: "Nordic Slate & Arctic Blue",
    category: "dark",
    description: "Cool Scandinavian graphite balanced with crisp white typography and frosted glacial cyan.",
    isLight: false,
    colors: {
      background: "215 28% 12%",
      foreground: "210 20% 98%",
      card: "215 25% 17%",
      cardForeground: "210 20% 98%",
      popover: "215 25% 17%",
      popoverForeground: "210 20% 98%",
      primary: "199 89% 65%",
      primaryForeground: "215 28% 12%",
      secondary: "215 20% 23%",
      secondaryForeground: "210 20% 98%",
      muted: "215 20% 23%",
      mutedForeground: "215 15% 65%",
      accent: "199 89% 65%",
      accentForeground: "215 28% 12%",
      border: "215 18% 28%",
      ring: "199 89% 65%",
    },
    preview: {
      bg: "#161C24",
      text: "#F8FAFC",
      accent: "#56CCF2",
      secondary: "#202935",
      border: "#3B485A",
    },
    meshBlobs: [
      [18, 30, 42],
      [25, 45, 65],
      [15, 24, 34],
      [30, 55, 78],
    ],
  },

  // 8. Espresso & Warm Caramel
  {
    id: "espresso-warm-caramel",
    name: "Espresso & Warm Caramel",
    category: "dark",
    description: "Rich dark roasted coffee backdrop accented by warm whipped caramel and toasted hazelnut.",
    isLight: false,
    colors: {
      background: "24 20% 7%",
      foreground: "36 35% 96%",
      card: "24 18% 12%",
      cardForeground: "36 35% 96%",
      popover: "24 18% 12%",
      popoverForeground: "36 35% 96%",
      primary: "32 72% 54%",
      primaryForeground: "24 20% 7%",
      secondary: "24 15% 18%",
      secondaryForeground: "36 35% 96%",
      muted: "24 15% 18%",
      mutedForeground: "30 15% 65%",
      accent: "32 72% 54%",
      accentForeground: "24 20% 7%",
      border: "28 18% 25%",
      ring: "32 72% 54%",
    },
    preview: {
      bg: "#16110E",
      text: "#FAF5F0",
      accent: "#E08A33",
      secondary: "#231C17",
      border: "#4B3D34",
    },
    meshBlobs: [
      [35, 24, 18],
      [55, 36, 25],
      [25, 18, 14],
      [70, 45, 28],
    ],
  },

  // 9. Matcha Latte & Cream
  {
    id: "matcha-latte-cream",
    name: "Matcha Latte & Cream",
    category: "light",
    description: "Organic matcha green tea tones infused into soft whipped cream and earthy bamboo charcoal.",
    isLight: true,
    colors: {
      background: "110 25% 97%",
      foreground: "110 30% 12%",
      card: "110 20% 93%",
      cardForeground: "110 30% 12%",
      popover: "110 25% 97%",
      popoverForeground: "110 30% 12%",
      primary: "115 42% 38%",
      primaryForeground: "0 0% 100%",
      secondary: "110 16% 88%",
      secondaryForeground: "110 30% 12%",
      muted: "110 16% 88%",
      mutedForeground: "110 12% 45%",
      accent: "115 42% 38%",
      accentForeground: "0 0% 100%",
      border: "110 14% 84%",
      ring: "115 42% 38%",
    },
    preview: {
      bg: "#F6F9F5",
      text: "#192418",
      accent: "#408A38",
      secondary: "#EBF2EA",
      border: "#D2DFD0",
    },
    meshBlobs: [
      [225, 240, 225],
      [205, 230, 205],
      [240, 248, 240],
      [190, 220, 190],
    ],
  },

  // 10. Sunset Crimson & Plum
  {
    id: "sunset-crimson-plum",
    name: "Sunset Crimson & Plum",
    category: "dark",
    description: "Deep twilight plum base glowing with radiant coral crimson and dusk rose highlights.",
    isLight: false,
    colors: {
      background: "280 25% 8%",
      foreground: "280 15% 97%",
      card: "280 22% 13%",
      cardForeground: "280 15% 97%",
      popover: "280 22% 13%",
      popoverForeground: "280 15% 97%",
      primary: "348 82% 58%",
      primaryForeground: "0 0% 100%",
      secondary: "280 18% 19%",
      secondaryForeground: "280 15% 97%",
      muted: "280 18% 19%",
      mutedForeground: "320 15% 65%",
      accent: "348 82% 58%",
      accentForeground: "0 0% 100%",
      border: "280 18% 26%",
      ring: "348 82% 58%",
    },
    preview: {
      bg: "#17101B",
      text: "#FAF6FB",
      accent: "#E94065",
      secondary: "#24192B",
      border: "#4F375E",
    },
    meshBlobs: [
      [40, 20, 50],
      [65, 25, 60],
      [25, 12, 32],
      [80, 30, 70],
    ],
  },

  // 11. Minimalist Monochrome
  {
    id: "minimalist-monochrome",
    name: "Minimalist Monochrome (Studio Dark)",
    category: "dark",
    description: "The original timeless gallery contrast - pure dark room black and razor-sharp white.",
    isLight: false,
    colors: {
      background: "0 0% 0%",
      foreground: "0 0% 100%",
      card: "0 0% 5%",
      cardForeground: "0 0% 100%",
      popover: "0 0% 5%",
      popoverForeground: "0 0% 100%",
      primary: "0 0% 100%",
      primaryForeground: "0 0% 0%",
      secondary: "0 0% 10%",
      secondaryForeground: "0 0% 100%",
      muted: "0 0% 10%",
      mutedForeground: "0 0% 50%",
      accent: "0 0% 100%",
      accentForeground: "0 0% 0%",
      border: "0 0% 15%",
      ring: "0 0% 100%",
    },
    preview: {
      bg: "#000000",
      text: "#FFFFFF",
      accent: "#FFFFFF",
      secondary: "#0D0D0D",
      border: "#262626",
    },
    meshBlobs: [
      [8, 8, 20],
      [10, 15, 40],
      [5, 5, 15],
      [12, 18, 45],
    ],
  },

  // 12. Sage & Warm Stone
  {
    id: "sage-warm-stone",
    name: "Sage & Warm Stone",
    category: "light",
    description: "Warm limestone architecture accented with calming botanical sage and slate minerals.",
    isLight: true,
    colors: {
      background: "40 20% 96%",
      foreground: "140 15% 15%",
      card: "40 18% 91%",
      cardForeground: "140 15% 15%",
      popover: "40 20% 96%",
      popoverForeground: "140 15% 15%",
      primary: "148 26% 42%",
      primaryForeground: "0 0% 100%",
      secondary: "40 14% 86%",
      secondaryForeground: "140 15% 15%",
      muted: "40 14% 86%",
      mutedForeground: "140 10% 46%",
      accent: "148 26% 42%",
      accentForeground: "0 0% 100%",
      border: "40 12% 80%",
      ring: "148 26% 42%",
    },
    preview: {
      bg: "#F7F6F3",
      text: "#212823",
      accent: "#4F8766",
      secondary: "#EBE8E2",
      border: "#D0CBC0",
    },
    meshBlobs: [
      [235, 230, 220],
      [215, 228, 218],
      [245, 242, 235],
      [200, 218, 205],
    ],
  },

  // 13. Royal Amethyst & Rose
  {
    id: "royal-amethyst-rose",
    name: "Royal Amethyst & Rose",
    category: "dark",
    description: "Deep violet amethyst shadows crowned with vibrant magenta orchid and rose gold sparks.",
    isLight: false,
    colors: {
      background: "270 30% 7%",
      foreground: "270 20% 96%",
      card: "270 25% 12%",
      cardForeground: "270 20% 96%",
      popover: "270 25% 12%",
      popoverForeground: "270 20% 96%",
      primary: "280 75% 62%",
      primaryForeground: "0 0% 100%",
      secondary: "270 20% 18%",
      secondaryForeground: "270 20% 96%",
      muted: "270 20% 18%",
      mutedForeground: "275 15% 65%",
      accent: "280 75% 62%",
      accentForeground: "0 0% 100%",
      border: "270 20% 25%",
      ring: "280 75% 62%",
    },
    preview: {
      bg: "#130E1A",
      text: "#F6F3FA",
      accent: "#A855F7",
      secondary: "#20172B",
      border: "#4B3664",
    },
    meshBlobs: [
      [35, 18, 55],
      [55, 25, 80],
      [20, 10, 35],
      [65, 30, 95],
    ],
  },

  // 14. Solar Amber & Carbon
  {
    id: "solar-amber-carbon",
    name: "Solar Amber & Carbon",
    category: "dark",
    description: "Sleek carbon composite black heated by an intense, energizing solar amber flame.",
    isLight: false,
    colors: {
      background: "0 0% 7%",
      foreground: "0 0% 98%",
      card: "0 0% 11%",
      cardForeground: "0 0% 98%",
      popover: "0 0% 11%",
      popoverForeground: "0 0% 98%",
      primary: "38 95% 52%",
      primaryForeground: "0 0% 7%",
      secondary: "0 0% 16%",
      secondaryForeground: "0 0% 98%",
      muted: "0 0% 16%",
      mutedForeground: "35 15% 65%",
      accent: "38 95% 52%",
      accentForeground: "0 0% 7%",
      border: "38 35% 22%",
      ring: "38 95% 52%",
    },
    preview: {
      bg: "#121212",
      text: "#FAF9F8",
      accent: "#F79B11",
      secondary: "#1C1C1C",
      border: "#4C381E",
    },
    meshBlobs: [
      [35, 22, 10],
      [55, 32, 12],
      [20, 14, 8],
      [65, 38, 14],
    ],
  },

  // 15. Bauhaus Modernist
  {
    id: "bauhaus-modernist",
    name: "Bauhaus Modernist (Chalk & Cobalt)",
    category: "light",
    description: "Architectural design school aesthetic with clean chalk backdrop, electric cobalt, and vermillion.",
    isLight: true,
    colors: {
      background: "220 20% 97%",
      foreground: "220 25% 14%",
      card: "220 18% 92%",
      cardForeground: "220 25% 14%",
      popover: "220 20% 97%",
      popoverForeground: "220 25% 14%",
      primary: "225 88% 56%",
      primaryForeground: "0 0% 100%",
      secondary: "220 15% 87%",
      secondaryForeground: "220 25% 14%",
      muted: "220 15% 87%",
      mutedForeground: "220 12% 46%",
      accent: "18 92% 54%",
      accentForeground: "0 0% 100%",
      border: "220 16% 83%",
      ring: "225 88% 56%",
    },
    preview: {
      bg: "#F5F7FA",
      text: "#1B212B",
      accent: "#2B63F2",
      secondary: "#E6ECF4",
      border: "#C8D4E5",
    },
    meshBlobs: [
      [225, 235, 250],
      [210, 225, 245],
      [240, 245, 252],
      [195, 215, 240],
    ],
  },
];

export const PUBLIC_DEFAULT_STORAGE_KEY = "shubham_public_default_theme";
export const ACTIVE_PREVIEW_STORAGE_KEY = "shubham_active_preview_theme";

// Helper to find palette by ID
export function getPaletteById(id: string): ThemePalette {
  return THEME_PALETTES.find((p) => p.id === id) || THEME_PALETTES[0];
}

// Get the saved public default theme ID
export function getPublicDefaultThemeId(): string {
  if (typeof window === "undefined") {
    return defaultThemeConfig.defaultThemeId || "ivory-charcoal-terracotta";
  }
  return (
    localStorage.getItem(PUBLIC_DEFAULT_STORAGE_KEY) ||
    defaultThemeConfig.defaultThemeId ||
    "ivory-charcoal-terracotta"
  );
}

// Get current active theme ID (preview or public default)
export function getActiveThemeId(): string {
  if (typeof window === "undefined") {
    return getPublicDefaultThemeId();
  }
  return (
    sessionStorage.getItem(ACTIVE_PREVIEW_STORAGE_KEY) ||
    getPublicDefaultThemeId()
  );
}

// Apply theme palette variables to document root
export function applyTheme(paletteOrId: string | ThemePalette): ThemePalette {
  const palette =
    typeof paletteOrId === "string" ? getPaletteById(paletteOrId) : paletteOrId;

  if (typeof document === "undefined") return palette;

  const root = document.documentElement;

  // Toggle .light class for Tailwind compatibility
  if (palette.isLight) {
    root.classList.add("light");
    root.classList.remove("dark");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
  }

  // Set CSS variables
  root.style.setProperty("--background", palette.colors.background);
  root.style.setProperty("--foreground", palette.colors.foreground);
  root.style.setProperty("--card", palette.colors.card);
  root.style.setProperty("--card-foreground", palette.colors.cardForeground);
  root.style.setProperty("--popover", palette.colors.popover);
  root.style.setProperty("--popover-foreground", palette.colors.popoverForeground);
  root.style.setProperty("--primary", palette.colors.primary);
  root.style.setProperty("--primary-foreground", palette.colors.primaryForeground);
  root.style.setProperty("--secondary", palette.colors.secondary);
  root.style.setProperty("--secondary-foreground", palette.colors.secondaryForeground);
  root.style.setProperty("--muted", palette.colors.muted);
  root.style.setProperty("--muted-foreground", palette.colors.mutedForeground);
  root.style.setProperty("--accent", palette.colors.accent);
  root.style.setProperty("--accent-foreground", palette.colors.accentForeground);
  root.style.setProperty("--border", palette.colors.border);
  root.style.setProperty("--input", palette.colors.border);
  root.style.setProperty("--ring", palette.colors.ring);

  // Set data attributes
  root.setAttribute("data-theme", palette.id);
  root.setAttribute("data-theme-mode", palette.isLight ? "light" : "dark");

  if (typeof window !== "undefined") {
    (window as any).__shubhamActiveTheme = palette;
  }

  // Dispatch custom event for background canvas and listeners
  window.dispatchEvent(
    new CustomEvent("shubham-theme-change", {
      detail: {
        themeId: palette.id,
        isLight: palette.isLight,
        meshBlobs: palette.meshBlobs,
        preview: palette.preview,
      },
    })
  );

  return palette;
}

// Set temporary preview theme
export function setPreviewTheme(paletteId: string): ThemePalette {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ACTIVE_PREVIEW_STORAGE_KEY, paletteId);
  }
  return applyTheme(paletteId);
}

// Save theme as public default
export function setPublicDefaultTheme(paletteId: string): ThemePalette {
  if (typeof window !== "undefined") {
    localStorage.setItem(PUBLIC_DEFAULT_STORAGE_KEY, paletteId);
    sessionStorage.removeItem(ACTIVE_PREVIEW_STORAGE_KEY);
  }
  return applyTheme(paletteId);
}

// Revert to saved public default
export function revertToPublicDefault(): ThemePalette {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ACTIVE_PREVIEW_STORAGE_KEY);
  }
  const defaultId = getPublicDefaultThemeId();
  return applyTheme(defaultId);
}
