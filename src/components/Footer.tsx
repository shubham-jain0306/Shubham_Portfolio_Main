import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative z-10">
      {/* CTA Section */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-24 border-t border-border">
        <p className="text-muted-foreground text-sm mb-4 font-mono">.Hey</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-tight max-w-3xl mb-8">
          I'm open to freelance projects, ready to craft logos, branding, packaging, and digital creatives. Drop me an email and let's collaborate.
        </h2>
        <Link
          to="/contact"
          className="inline-block border border-border text-foreground text-sm px-6 py-3 rounded-full hover:bg-secondary transition-colors"
        >
          Contact Me
        </Link>
      </section>

      {/* Footer Links */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-6 border-t border-border flex flex-wrap items-center gap-4 md:gap-6">
        {[
          { label: "projects", path: "/projects" },
          { label: "about", path: "/about" },
          { label: "notes", path: "/blog" },
          { label: "contact", path: "/contact" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
