import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "@/data/blog";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { SITE_URL } from "@/lib/seo";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = blogPosts.findIndex((p) => p.slug === slug);
  const post = index >= 0 ? blogPosts[index] : undefined;

  if (!post) return <NotFound />;

  const prev = index > 0 ? blogPosts[index - 1] : null;
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : null;

  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.image;

  const isoDate = (() => {
    const d = new Date(post.date);
    return isNaN(d.getTime()) ? post.date : d.toISOString();
  })();

  const wordCount = post.content.join(" ").trim().split(/\s+/).length;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: ogImage,
    },
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Person",
      name: "Shubham Jain",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Shubham Jain",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    url: canonical,
    inLanguage: "en",
    wordCount,
    articleBody: post.content.join("\n\n"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Notes",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  return (
    <main>
      <Helmet>
        <title>{post.title} - Shubham Jain</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} - Shubham Jain`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Shubham Jain" />
        <meta property="article:published_time" content={isoDate} />
        <meta property="article:modified_time" content={isoDate} />
        <meta property="article:author" content="Shubham Jain" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - Shubham Jain`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data - BlogPosting */}
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        {/* Structured Data - BreadcrumbList */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <article className="max-w-[860px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-16 pb-12">
        <Link
          to="/blog"
          className="text-muted-foreground text-sm hover:text-foreground transition-colors underline underline-offset-4"
        >
          ← Back to Notes
        </Link>

        <p className="text-muted-foreground text-xs font-mono mt-10 mb-4">{post.date}</p>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6 tracking-tight leading-[1.1]">
          {post.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
          {post.excerpt}
        </p>

        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-12">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6 text-foreground/80 text-base md:text-lg leading-relaxed">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Prev / Next navigation */}
        <nav
          aria-label="Note navigation"
          className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="group block p-5 rounded-xl border border-border/60 hover:border-foreground/30 hover:bg-foreground/[0.03] transition-all duration-300"
            >
              <p className="text-muted-foreground text-xs font-mono mb-2">← Previous note</p>
              <p className="text-foreground font-medium leading-snug group-hover:underline underline-offset-4">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              to={`/blog/${next.slug}`}
              className="group block p-5 rounded-xl border border-border/60 hover:border-foreground/30 hover:bg-foreground/[0.03] transition-all duration-300 sm:text-right"
            >
              <p className="text-muted-foreground text-xs font-mono mb-2">Next note →</p>
              <p className="text-foreground font-medium leading-snug group-hover:underline underline-offset-4">
                {next.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <div className="mt-10">
          <Link
            to="/blog"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors underline underline-offset-4"
          >
            ← All notes
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPost;
