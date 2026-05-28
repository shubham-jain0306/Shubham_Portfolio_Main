import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Build-time sitemap generator. Parses slug fields from data files
// (regex-based to avoid compiling TS in the Vite config) and writes
// public/sitemap.xml so it is shipped with both dev and production builds.
function sitemapPlugin(): Plugin {
  const SITE_URL =
    "https://id-preview--ba1f4b84-fff8-43ad-89da-a66f576b9850.lovable.app";
  const STATIC_ROUTES: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/contact", priority: 0.7 },
  ];

  const extractSlugs = (file: string): string[] => {
    try {
      const src = fs.readFileSync(path.resolve(__dirname, file), "utf8");
      const matches = src.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g);
      return Array.from(new Set(Array.from(matches, (m) => m[1])));
    } catch {
      return [];
    }
  };

  const generate = () => {
    const projectSlugs = extractSlugs("src/data/projects.ts");
    const blogSlugs = extractSlugs("src/data/blog.ts");
    const urls = [
      ...STATIC_ROUTES.map((r) => ({ loc: `${SITE_URL}${r.path}`, priority: r.priority })),
      ...projectSlugs.map((s) => ({ loc: `${SITE_URL}/work/${s}`, priority: 0.7 })),
      ...blogSlugs.map((s) => ({ loc: `${SITE_URL}/blog/${s}`, priority: 0.6 })),
    ];
    const lastmod = new Date().toISOString().slice(0, 10);
    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls
        .map(
          (u) =>
            `  <url><loc>${u.loc}</loc><lastmod>${lastmod}</lastmod><priority>${u.priority.toFixed(1)}</priority></url>`
        )
        .join("\n") +
      `\n</urlset>\n`;
    fs.mkdirSync(path.resolve(__dirname, "public"), { recursive: true });
    fs.writeFileSync(path.resolve(__dirname, "public/sitemap.xml"), xml);

    const robots =
      `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
    fs.writeFileSync(path.resolve(__dirname, "public/robots.txt"), robots);
  };

  return {
    name: "sitemap-generator",
    buildStart() {
      generate();
    },
    configureServer() {
      generate();
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    sitemapPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
