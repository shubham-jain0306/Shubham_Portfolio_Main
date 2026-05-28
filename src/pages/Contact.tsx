import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const Contact = () => {
  const title = "Contact - Shubham Jain";
  const description = "Get in touch with Shubham Jain for branding, identity, packaging, and digital design projects.";
  const canonical = `${SITE_URL}/contact`;

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: title,
    url: canonical,
    description,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Contact", item: canonical },
    ],
  };

  return (
    <main>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(contactJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-16 pb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground mb-16">Say Hello</h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed max-w-4xl text-left">
          Let's create something beautiful together. Reach out to collaborate or connect me on LinkedIn
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12">
          <form className="space-y-0" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-secondary border-0 border-b border-border px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-secondary border-0 border-b border-border px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full bg-secondary border-0 border-b border-border px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
              />
            </div>
            <div className="pt-6">
              <button
                type="submit"
                className="bg-foreground text-background text-sm font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Submit
              </button>
            </div>
          </form>

          <a
            href="https://www.linkedin.com/in/shubham-jain-1aa891226"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 h-fit"
          >
            <div className="w-12 h-12 border border-border rounded-lg flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"/>
                <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"/>
                <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"/>
              </svg>
            </div>
            <div>
              <p className="text-foreground font-medium">LinkedIn</p>
              <p className="text-muted-foreground text-sm">@shubham</p>
            </div>
          </a>
        </div>
      </section>

      {/* Simple footer links */}
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
    </main>
  );
};

export default Contact;
