import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "@/data/blog";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";

const Blog = () => {
  const title = "Notes - Shubham Jain";
  const description = "Design notes, thoughts, and explorations on branding, packaging, typography, and creative workflow by Shubham Jain.";
  const canonical = `${SITE_URL}/blog`;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: title,
    description,
    url: canonical,
    inLanguage: "en",
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      image: p.image,
      datePublished: p.date,
      author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Notes", item: canonical },
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
        <script type="application/ld+json">{JSON.stringify(blogJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-16 pb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground mb-12">Notes</h1>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-20">
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 items-start">
                <div className="aspect-[16/10] rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <SectionLabelInline label="latest post" />
                  <h3 className="text-xl md:text-2xl font-medium text-foreground mt-4">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2">{post.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

const SectionLabelInline = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3">
    <div className="h-px flex-1 bg-border" />
    <span className="text-muted-foreground text-xs font-mono whitespace-nowrap">{label}</span>
  </div>
);

export default Blog;
