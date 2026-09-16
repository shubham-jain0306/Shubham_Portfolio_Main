import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import AdminThemeChanger from "./pages/AdminThemeChanger";
import { applyTheme, getActiveThemeId } from "@/lib/themeManager";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Apply saved default or preview theme on load
    applyTheme(getActiveThemeId());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Toaster richColors position="top-right" />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="/admin/theme" element={<AdminThemeChanger />} />
              <Route path="/theme-changer" element={<AdminThemeChanger />} />
              <Route path="/theme" element={<AdminThemeChanger />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

