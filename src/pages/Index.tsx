import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";
import HeroText from "@/components/HeroText";
import { BorderBeam } from "@/components/ui/border-beam";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, SOCIAL_PROFILES } from "@/lib/seo";

const Index = () => {
  const latestNotes = blogPosts.slice(0, 3);

  const title = "Shubham Jain - Designer & Brand Strategist";
  const description =
    "Portfolio of Shubham Jain - Designer rooted in clarity and storytelling, crafting bold brands, digital experiences, and lasting value.";
  const canonical = `${SITE_URL}/`;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    jobTitle: "Designer & Brand Strategist",
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    sameAs: SOCIAL_PROFILES,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
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
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      </Helmet>
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-8 sm:pt-12 pb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-2">
          <p className="text-muted-foreground text-sm font-mono">Hey, I'm Shubham Jain</p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500" style={{ animation: "ledBlink 1s step-start infinite" }} />
            </span>
            Available for new projects
          </div>
        </div>
        <HeroText />
      </section>

      {/* Projects */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-20">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      {/* About */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-20">
        <SectionLabel label="About" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
              A designer, maker, and curious wanderer fueled by coffee and creativity. For me, design isn't just about how things look, it's about how they feel and the stories they tell. I believe in hiding the ego, giving freedom to ideas, and making small steps that move the world toward something better.
            </p>
            <Link to="/about" className="text-muted-foreground text-sm hover:text-foreground transition-colors underline underline-offset-4">
              About Me
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <img
              src="https://framerusercontent.com/images/Mcxpek5tE4cK1Tu7eGQJHDEA4qM.jpg?width=1680&height=2392"
              alt="Portrait of Shubham Jain, designer and brand strategist based in Jaipur"
              loading="lazy"
              className="w-full h-auto object-cover rounded-xl"
            />
            <BorderBeam
              duration={6}
              size={400}
              borderWidth={2}
              colorFrom="#06b6d4"
              colorTo="transparent"
            />
            <BorderBeam
              duration={6}
              delay={3}
              size={400}
              borderWidth={2}
              colorFrom="#a855f7"
              colorTo="transparent"
            />
          </div>
        </div>
      </section>

      {/* Latest Notes */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-20">
        <SectionLabel label="three latest notes" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {latestNotes.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <Link to="/blog" className="text-muted-foreground text-sm hover:text-foreground transition-colors underline underline-offset-4">
          visit blog
        </Link>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
