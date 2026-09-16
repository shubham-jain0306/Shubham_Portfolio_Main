import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Check,
  Eye,
  Save,
  RotateCcw,
  Sparkles,
  Palette,
  Sun,
  Moon,
  Zap,
  Layers,
  Copy,
  ArrowRight,
  ShieldCheck,
  Globe,
} from "lucide-react";
import {
  THEME_PALETTES,
  ThemePalette,
  getPublicDefaultThemeId,
  getActiveThemeId,
  applyTheme,
  setPreviewTheme,
  setPublicDefaultTheme,
  revertToPublicDefault,
} from "@/lib/themeManager";
import { toast } from "sonner";

const AdminThemeChanger = () => {
  const [activePreviewId, setActivePreviewId] = useState<string>(getActiveThemeId());
  const [publicDefaultId, setPublicDefaultId] = useState<string>(getPublicDefaultThemeId());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync state when custom theme change event occurs
  useEffect(() => {
    const handleThemeChange = (e: any) => {
      setActivePreviewId(e.detail.themeId);
    };
    window.addEventListener("shubham-theme-change", handleThemeChange);
    return () => window.removeEventListener("shubham-theme-change", handleThemeChange);
  }, []);

  const handlePreview = (palette: ThemePalette) => {
    setPreviewTheme(palette.id);
    setActivePreviewId(palette.id);
    toast.info(`Previewing: ${palette.name}`, {
      description: "Browsing live with this palette. Click 'Save as Public Default' to apply permanently.",
      duration: 3500,
    });
  };

  const handleSavePublicDefault = (palette: ThemePalette) => {
    setPublicDefaultTheme(palette.id);
    setPublicDefaultId(palette.id);
    setActivePreviewId(palette.id);
    toast.success(`Saved as Public Default!`, {
      description: `"${palette.name}" is now the default theme for all visitors across the portfolio.`,
      duration: 5000,
    });
  };

  const handleRevert = () => {
    const reverted = revertToPublicDefault();
    setActivePreviewId(reverted.id);
    toast.success("Reverted to Public Default", {
      description: `Restored to "${reverted.name}".`,
    });
  };

  const copyConfigJson = () => {
    const json = JSON.stringify({ defaultThemeId: activePreviewId }, null, 2);
    navigator.clipboard.writeText(json);
    setCopiedCode(true);
    toast.success("Copied themeConfig.json to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredPalettes = THEME_PALETTES.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "required") return p.category === "required";
    if (selectedCategory === "light") return p.isLight;
    if (selectedCategory === "dark") return !p.isLight && p.category !== "required";
    if (selectedCategory === "cyber") return p.id.includes("neon") || p.id.includes("solar");
    return true;
  });

  const activePalette = THEME_PALETTES.find((p) => p.id === activePreviewId) || THEME_PALETTES[0];
  const isCurrentlyPreviewingDifferent = activePreviewId !== publicDefaultId;

  return (
    <main className="min-h-screen pb-28 pt-8">
      <Helmet>
        <title>Theme Manager & Color Palettes (Admin) - Shubham Jain</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Top Banner if previewing a different theme */}
      {isCurrentlyPreviewingDifferent && (
        <div className="sticky top-0 z-50 mb-8 border-b border-primary/20 bg-card/95 backdrop-blur-md px-6 py-3 shadow-lg">
          <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <p className="text-sm font-medium">
                Live Preview Active: <span className="text-primary font-semibold">{activePalette.name}</span>
                <span className="text-muted-foreground text-xs ml-2 hidden sm:inline">
                  (Site visitors currently see "{THEME_PALETTES.find((p) => p.id === publicDefaultId)?.name}")
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRevert}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-border hover:bg-muted transition-colors flex items-center gap-1.5"
              >
                <RotateCcw size={13} /> Revert
              </button>
              <button
                onClick={() => handleSavePublicDefault(activePalette)}
                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
              >
                <Globe size={13} /> Save as Public Default
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6">
        {/* Header */}
        <div className="mb-10 pb-8 border-b border-border flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                <ShieldCheck size={12} /> Admin Studio
              </span>
              <span className="text-xs font-mono text-muted-foreground">15 Master Palettes</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground tracking-tight">
              Color Theme Switcher
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
              Curate and broadcast the color palette for your entire portfolio website. Choose any of the master
              themes below, preview it in real-time, and save it as the global public default.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={copyConfigJson}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-border hover:bg-card transition-colors flex items-center gap-2"
              title="Copy active theme JSON configuration"
            >
              <Copy size={14} /> {copiedCode ? "Copied!" : "Export config.json"}
            </button>
            <Link
              to="/"
              className="px-4 py-2 text-xs font-medium rounded-lg bg-secondary hover:bg-muted text-foreground transition-colors flex items-center gap-1.5"
            >
              View Live Portfolio <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Current Status Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
            <p className="text-xs font-mono text-muted-foreground mb-1 flex items-center gap-1.5">
              <Globe size={13} className="text-primary" /> Active Public Default
            </p>
            <p className="text-lg font-medium text-foreground">
              {THEME_PALETTES.find((p) => p.id === publicDefaultId)?.name || publicDefaultId}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Rendered by default for all incoming site visitors.</p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm">
            <p className="text-xs font-mono text-muted-foreground mb-1 flex items-center gap-1.5">
              <Eye size={13} className="text-primary" /> Current Live Preview
            </p>
            <p className="text-lg font-medium text-foreground">{activePalette.name}</p>
            <p className="text-xs text-muted-foreground mt-1">Currently active in your browser session.</p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-mono text-muted-foreground mb-1 flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary" /> Required Core Themes
            </p>
            <p className="text-lg font-medium text-foreground">5 Primary + 10 Curated</p>
            <p className="text-xs text-muted-foreground mt-1">Ivory, Off-white, Warm White, Gold, Neon & more.</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-border/50">
          {[
            { id: "all", label: "All Themes (15)", icon: Layers },
            { id: "required", label: "5 Required Palettes", icon: Sparkles },
            { id: "light", label: "Editorial Light", icon: Sun },
            { id: "dark", label: "Luxury Dark", icon: Moon },
            { id: "cyber", label: "Cyber & Electric", icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPalettes.map((palette, index) => {
            const isPublicDefault = palette.id === publicDefaultId;
            const isPreviewing = palette.id === activePreviewId;

            return (
              <div
                key={palette.id}
                className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isPreviewing
                    ? "border-primary ring-2 ring-primary/40 bg-card shadow-xl scale-[1.01]"
                    : "border-border bg-card/60 hover:border-foreground/30 hover:shadow-lg"
                }`}
              >
                {/* Card Top Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-muted-foreground">
                      #{String(THEME_PALETTES.findIndex((p) => p.id === palette.id) + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {palette.category === "required" && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Priority
                        </span>
                      )}
                      {palette.isLight ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-muted text-muted-foreground border border-border flex items-center gap-1">
                          <Sun size={10} /> Light
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-muted text-muted-foreground border border-border flex items-center gap-1">
                          <Moon size={10} /> Dark
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {palette.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {palette.description}
                  </p>

                  {/* Swatches Pill Row */}
                  <div className="mt-4 pt-4 border-t border-border/70">
                    <div className="flex items-center justify-between mb-1.5 text-[11px] font-mono text-muted-foreground">
                      <span>Color Harmony</span>
                      <span className="text-[10px]">{palette.preview.accent}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 h-7 rounded-lg overflow-hidden p-1 bg-background/50 border border-border">
                      <div
                        className="rounded-sm flex items-center justify-center text-[9px] font-mono shadow-inner"
                        style={{ backgroundColor: palette.preview.bg }}
                        title={`Background: ${palette.preview.bg}`}
                      />
                      <div
                        className="rounded-sm flex items-center justify-center text-[9px] font-mono shadow-inner"
                        style={{ backgroundColor: palette.preview.secondary }}
                        title={`Card: ${palette.preview.secondary}`}
                      />
                      <div
                        className="rounded-sm flex items-center justify-center text-[9px] font-mono shadow-inner"
                        style={{ backgroundColor: palette.preview.border }}
                        title={`Border: ${palette.preview.border}`}
                      />
                      <div
                        className="rounded-sm flex items-center justify-center text-[9px] font-mono shadow-inner"
                        style={{ backgroundColor: palette.preview.accent }}
                        title={`Accent: ${palette.preview.accent}`}
                      />
                      <div
                        className="rounded-sm flex items-center justify-center text-[9px] font-mono shadow-inner"
                        style={{ backgroundColor: palette.preview.text }}
                        title={`Text: ${palette.preview.text}`}
                      />
                    </div>
                  </div>

                  {/* Embedded Mini-Mockup */}
                  <div
                    className="mt-4 rounded-xl p-3.5 border transition-all duration-300 relative shadow-inner"
                    style={{
                      backgroundColor: palette.preview.bg,
                      color: palette.preview.text,
                      borderColor: palette.preview.border,
                    }}
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: palette.preview.border }}>
                      <span className="text-[11px] font-bold tracking-wider">SHUBHAM</span>
                      <div className="flex items-center gap-1 text-[9px] opacity-70">
                        <span>Projects</span>
                        <span>About</span>
                        <span>Notes</span>
                      </div>
                    </div>

                    <div className="py-2">
                      <div className="text-[10px] font-mono opacity-60 mb-1">Brand & Identity Designer</div>
                      <div className="text-xs font-bold leading-tight line-clamp-2">
                        Crafting bold brands, digital experiences & lasting value.
                      </div>
                    </div>

                    <div
                      className="mt-2.5 p-2 rounded-lg flex items-center justify-between text-[10px]"
                      style={{
                        backgroundColor: palette.preview.secondary,
                        borderColor: palette.preview.border,
                      }}
                    >
                      <span className="font-medium truncate max-w-[120px]">Psylief Technologies</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white shadow-sm"
                        style={{ backgroundColor: palette.preview.accent }}
                      >
                        View Project
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-muted/30 border-t border-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => handlePreview(palette)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      isPreviewing
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "bg-secondary hover:bg-muted text-foreground border border-border"
                    }`}
                  >
                    <Eye size={13} /> {isPreviewing ? "Active" : "Preview"}
                  </button>

                  <button
                    onClick={() => handleSavePublicDefault(palette)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      isPublicDefault
                        ? "bg-green-600 text-white shadow-sm"
                        : "bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
                    }`}
                  >
                    {isPublicDefault ? (
                      <>
                        <Check size={13} /> Default
                      </>
                    ) : (
                      <>
                        <Save size={13} /> Set Default
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Architecture Notes */}
        <div className="mt-16 p-6 rounded-2xl border border-border bg-card/40">
          <div className="flex items-center gap-2 mb-2">
            <Palette size={16} className="text-primary" />
            <h4 className="text-sm font-semibold text-foreground">How Theming Works Under the Hood</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The palette system injects standard HSL CSS variables (<code className="text-foreground">--background</code>,{" "}
            <code className="text-foreground">--foreground</code>, <code className="text-foreground">--primary</code>,{" "}
            <code className="text-foreground">--card</code>, <code className="text-foreground">--border</code>) into the document root.
            When saved as Public Default, the selection is persisted in both local browser storage and mirrored in{" "}
            <code className="text-foreground">themeConfig.json</code>. An inline synchronous bootloader in{" "}
            <code className="text-foreground">index.html</code> guarantees zero visual flash when any page is loaded publicly.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AdminThemeChanger;
