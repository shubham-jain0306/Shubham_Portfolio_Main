import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main>
      <Helmet>
        <title>Page not found - Shubham Jain</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-24 pb-32 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="text-muted-foreground text-sm font-mono mb-6">Error 404</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-foreground mb-6 tracking-tight">
          Lost in the grid.
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          The page{" "}
          <span className="text-foreground/80 font-mono text-sm">{location.pathname}</span>{" "}
          doesn't exist - it may have been moved, renamed, or never made it past the sketchbook.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Back to home
          </Link>
          <Link
            to="/blog"
            className="px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-foreground/[0.04] transition-colors"
          >
            Read the notes
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NotFound;
