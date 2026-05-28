import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getProject, getRelatedProjects } from "@/data/projects";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug || "");
  const related = getRelatedProjects(slug || "");

  if (!project) {
    return (
      <main className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-16">
        <h1 className="text-4xl font-medium text-foreground">Project not found</h1>
      </main>
    );
  }

  const title = `${project.title} - ${project.category} by Shubham Jain`;
  const description = project.subtitle;
  const canonical = `${SITE_URL}/work/${project.slug}`;
  const ogImage = project.heroImage;

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description || project.subtitle,
    abstract: project.subtitle,
    url: canonical,
    image: ogImage,
    dateCreated: project.year,
    genre: project.category,
    keywords: [project.category, project.title, "design", "branding"].join(", "),
    creator: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
    inLanguage: "en",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: canonical },
    ],
  };

  return (
    <main>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(creativeWorkJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      {/* Title */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-16 pb-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground mb-16">{project.title}</h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed max-w-4xl mx-auto text-center">
          {project.subtitle}
        </p>
      </section>

      {/* Hero Image */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
        <p className="text-muted-foreground/50 text-sm mb-4 font-mono">00</p>
        <div className="rounded-lg overflow-hidden">
          <img src={project.heroImage} alt={`${project.title} - ${project.category} hero visual by Shubham Jain`} fetchPriority="high" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* Description */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </section>

      {/* Secondary Image */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
        <div className="rounded-lg overflow-hidden">
          <img src={project.secondaryImage} alt={`${project.title} - supporting visual showing ${project.category.toLowerCase()} details`} loading="lazy" className="w-full h-auto object-cover" />
        </div>
      </section>

      {/* Long Description */}
      {project.longDescription && (
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
          <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-4xl">
            {project.longDescription}
          </p>
        </section>
      )}

      {/* Metadata */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-border py-6">
          <div>
            <p className="text-muted-foreground text-xs mb-1 font-mono">year</p>
            <p className="text-foreground text-sm">{project.year}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1 font-mono">timeframe</p>
            <p className="text-foreground text-sm">{project.timeframe}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1 font-mono">tools</p>
            <p className="text-foreground text-sm">{project.tools}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1 font-mono">category</p>
            <p className="text-foreground text-sm">{project.category}</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8 space-y-8">
        {project.galleryImages.map((img) => (
          <div key={img.label}>
            <p className="text-muted-foreground/50 text-sm mb-4 font-mono">{img.label}</p>
            <div className="rounded-lg overflow-hidden">
              <img src={img.src} alt={img.caption ? `${project.title} - ${img.caption}` : `${project.title} - gallery image ${img.label}`} loading="lazy" className="w-full h-auto object-cover" />
            </div>
            {img.caption && (
              <p className="text-muted-foreground text-sm mt-3">{img.caption}</p>
            )}
          </div>
        ))}
      </section>

      {/* See Also */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-16">
        <SectionLabel label="see also" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {related.map((p) => (
            <Link
              key={p.id}
              to={`/work/${p.slug}`}
              className="group block"
            >
              <div className="rounded-lg overflow-hidden mb-3 aspect-[4/3]">
                <img
                  src={p.cardImage}
                  alt={`${p.title} - ${p.category} project by Shubham Jain`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-muted-foreground text-xs mb-1">{p.category}</p>
              <p className="text-foreground text-sm font-medium">{p.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectDetail;
