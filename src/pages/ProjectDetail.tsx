import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BookOpen, Download, ZoomIn } from "lucide-react";
import { getProject, getRelatedProjects } from "@/data/projects";
import type { FlipbookDocument, EmailerItem } from "@/data/projects";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";
import FlipbookViewer from "@/components/FlipbookViewer";
import SocialCarouselViewer from "@/components/SocialCarouselViewer";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug || "");
  const related = getRelatedProjects(slug || "");
  const [activeFlipbook, setActiveFlipbook] = useState<FlipbookDocument | null>(null);
  const [activeEmailer, setActiveEmailer] = useState<EmailerItem | null>(null);

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

  const isSocialMedia = project.slug === "roverride";
  const isPrintPresentation = project.slug === "print-presentation";
  const isDigitalCommunication = project.slug === "digital-communication";
  const isMetaAds = project.slug === "meta-ads";

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
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground mb-16">
          {project.title}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed max-w-4xl mx-auto text-center">
          {project.subtitle}
        </p>
      </section>

      {/* Hero Image — Standard container matching approved baseline */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
        <p className="text-muted-foreground/50 text-sm mb-4 font-mono">00</p>
        <div className="rounded-lg overflow-hidden">
          <img
            src={project.heroImage}
            alt={`${project.title} - ${project.category} hero visual by Shubham Jain`}
            fetchPriority="high"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Description */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </section>

      {/* Secondary Image — Standard container matching approved baseline */}
      {project.secondaryImage && (
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
          <div className="rounded-lg overflow-hidden">
            <img
              src={project.secondaryImage}
              alt={`${project.title} - supporting visual showing ${project.category.toLowerCase()} details`}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
      )}

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

      {/* ─────────────────────────────────────────────────────────────
          1. SOCIAL MEDIA SPECIFIC: CAROUSELS, STANDALONE META AD, AND APPROVED GALLERY
         ───────────────────────────────────────────────────────────── */}
      {isSocialMedia && (
        <>
          {/* A. Interactive Horizontal Carousels */}
          {project.carousels && project.carousels.length > 0 && (
            <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
              <SectionLabel label="carousels" />
              <p className="text-muted-foreground text-sm mt-2 mb-8 max-w-2xl">
                Social media carousels designed for sequential storytelling. Browse through each slide horizontally using the arrow controls or swipe.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {project.carousels.map((carousel) => (
                  <SocialCarouselViewer key={carousel.id} carousel={carousel} />
                ))}
              </div>
            </section>
          )}

          {/* B. Standalone Meta Ad */}
          {project.metaAd && (
            <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
              <SectionLabel label="meta ad" />
              <div className="max-w-md mx-auto my-8 rounded-xl overflow-hidden border border-border/70 bg-card/40 shadow-sm">
                <div className="flex items-center justify-between px-5 py-3 bg-neutral-900/80 border-b border-white/5">
                  <span className="text-[11px] font-mono tracking-wider text-primary font-semibold flex items-center gap-1.5 uppercase">
                    <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                    {project.metaAd.badge}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">1:1 Paid Acquisition</span>
                </div>
                <div className="aspect-square overflow-hidden bg-neutral-950 flex items-center justify-center">
                  <img
                    src={project.metaAd.image}
                    alt={project.metaAd.title}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-5 border-t border-white/5">
                  <p className="text-foreground text-sm font-medium">{project.metaAd.title}</p>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{project.metaAd.subtitle}</p>
                </div>
              </div>
            </section>
          )}

          {/* C. Approved Brand Campaigns Gallery (Exact 6 Baseline Images Intact) */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8 space-y-8">
              <SectionLabel label="campaign creatives" />
              <div className="space-y-8 mt-6">
                {project.galleryImages.map((img) => (
                  <div key={img.label}>
                    <p className="text-muted-foreground/50 text-sm mb-4 font-mono">{img.label}</p>
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={img.src}
                        alt={`${project.title} - gallery image ${img.label}`}
                        loading="lazy"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {img.caption && (
                      <p className="text-muted-foreground text-sm mt-3">{img.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. PRINT & PRESENTATION: 4 COVER-ONLY DOCUMENTS & FLIPBOOKS
         ───────────────────────────────────────────────────────────── */}
      {isPrintPresentation && project.documents && project.documents.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
          <SectionLabel label="documents & flipbooks" />
          <p className="text-muted-foreground text-sm mt-2 mb-8 max-w-2xl">
            Cover previews of each document. Click any document card to launch the complete interactive flipbook and read page by page.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
            {project.documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setActiveFlipbook(doc)}
                className="group cursor-pointer rounded-xl border border-border/70 overflow-hidden hover:border-foreground/30 hover:shadow-xl transition-all duration-300 bg-card/40 flex flex-col"
              >
                {/* Document Cover Only (Controlled Aspect Ratio) */}
                <div className="aspect-[3/4] overflow-hidden relative bg-neutral-900/60">
                  <img
                    src={doc.coverImage}
                    alt={`${doc.title} — Cover`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5">
                      <BookOpen size={14} /> Open Flipbook
                    </div>
                  </div>
                </div>

                {/* Document Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-foreground text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                        {doc.title}
                      </h4>
                      <span className="text-[11px] font-mono text-muted-foreground shrink-0 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                        {doc.pageCount} pgs
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed">
                      {doc.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50">
                    <span className="text-xs text-primary font-medium flex items-center gap-1">
                      <BookOpen size={12} /> Read Flipbook
                    </span>
                    {doc.pdfPath && doc.pdfPath.endsWith(".pdf") && (
                      <a
                        href={doc.pdfPath}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                        title="Download PDF"
                      >
                        <Download size={12} /> PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. DIGITAL COMMUNICATION: 4 UNIQUE EMAILERS & DIGITAL SCREENS
         ───────────────────────────────────────────────────────────── */}
      {isDigitalCommunication && (
        <>
          {/* 4 Unique Emailers Grid */}
          {project.emailers && project.emailers.length > 0 && (
            <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
              <SectionLabel label="curated emailers" />
              <p className="text-muted-foreground text-sm mt-2 mb-8 max-w-2xl">
                Email layouts engineered for digital readability, conversion hierarchy, and branded touchpoints. Click any emailer to inspect the full design in high resolution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
                {project.emailers.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveEmailer(item)}
                    className="group cursor-pointer rounded-xl border border-border/70 overflow-hidden hover:border-foreground/30 hover:shadow-xl transition-all duration-300 bg-card/40 flex flex-col"
                  >
                    {/* Emailer Card Container with Controlled Height */}
                    <div className="aspect-[9/16] max-h-[460px] overflow-hidden relative bg-neutral-900/60">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5">
                          <ZoomIn size={14} /> Inspect Full Emailer
                        </div>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-xs mt-1 line-clamp-2 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-border/50">
                        <span className="text-xs text-primary font-medium flex items-center gap-1">
                          <ZoomIn size={12} /> View Full Layout
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Digital Displays & Touchpoints */}
          {project.digitalDisplays && project.digitalDisplays.length > 0 && (
            <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
              <SectionLabel label="digital displays" />
              <p className="text-muted-foreground text-sm mt-2 mb-8 max-w-2xl">
                Display-oriented digital screen creatives and event touchpoints.
              </p>

              <div className="space-y-8 my-6">
                {project.digitalDisplays.map((disp) => (
                  <div
                    key={disp.id}
                    className="rounded-xl border border-border/60 bg-card/30 p-5 transition-all duration-300 hover:border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-foreground text-sm font-medium">{disp.title}</h4>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {disp.aspectRatio || "Digital Screen"}
                      </span>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-border/30 bg-neutral-900/60">
                      <img
                        src={disp.image}
                        alt={disp.title}
                        loading="lazy"
                        className="w-full h-auto object-cover max-h-[600px]"
                      />
                    </div>
                    {disp.caption && (
                      <p className="text-muted-foreground text-xs font-mono mt-3">{disp.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. STANDALONE META ADS ROUTE VIEW (/work/meta-ads)
         ───────────────────────────────────────────────────────────── */}
      {isMetaAds && (
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8">
          <SectionLabel label="standalone creative" />
          <div className="max-w-md mx-auto my-8 rounded-xl overflow-hidden border border-border/70 bg-card/40 shadow-sm">
            <div className="flex items-center justify-between px-5 py-3 bg-neutral-900/80 border-b border-white/5">
              <span className="text-[11px] font-mono tracking-wider text-primary font-semibold flex items-center gap-1.5 uppercase">
                <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                META AD
              </span>
              <span className="text-xs font-mono text-muted-foreground">1:1 Paid Acquisition</span>
            </div>
            <div className="aspect-square overflow-hidden bg-neutral-950 flex items-center justify-center">
              <img
                src={project.heroImage}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-5 border-t border-white/5">
              <p className="text-foreground text-sm font-medium">Meta Paid Campaign Creative</p>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                Standalone creative engineered for instant recognition and conversion across Meta feed placements.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. STANDARD GALLERY (For baseline branding & packaging projects)
         ───────────────────────────────────────────────────────────── */}
      {!isSocialMedia && !isPrintPresentation && !isDigitalCommunication && !isMetaAds && project.galleryImages.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-8 space-y-8">
          {project.galleryImages.map((img) => (
            <div key={img.label}>
              <p className="text-muted-foreground/50 text-sm mb-4 font-mono">{img.label}</p>
              <div className="rounded-lg overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption ? `${project.title} - ${img.caption}` : `${project.title} - gallery image ${img.label}`}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
              {img.caption && (
                <p className="text-muted-foreground text-sm mt-3">{img.caption}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Flipbook Overlay Modal */}
      {activeFlipbook && (
        <FlipbookViewer
          document={activeFlipbook}
          onClose={() => setActiveFlipbook(null)}
        />
      )}

      {/* Emailer High-Res Lightbox Modal */}
      <Dialog open={activeEmailer !== null} onOpenChange={(open) => !open && setActiveEmailer(null)}>
        <DialogContent className="max-w-3xl max-h-[92vh] w-[95vw] bg-black/95 backdrop-blur-2xl border-white/10 p-4 sm:p-6 overflow-y-auto">
          <DialogTitle className="text-white text-base font-medium flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div>
              <span>{activeEmailer?.title}</span>
              <p className="text-xs font-mono text-white/50 font-normal mt-0.5">
                {activeEmailer?.subtitle}
              </p>
            </div>
          </DialogTitle>
          {activeEmailer && (
            <div className="flex flex-col items-center justify-center py-2">
              <img
                src={activeEmailer.fullImage}
                alt={activeEmailer.title}
                className="w-auto max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* See Also — Standard related projects grid matching approved baseline */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 py-16">
        <SectionLabel label="see also" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {related.slice(0, 4).map((p) => (
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
              <p className="text-muted-foreground text-xs mb-1 font-mono">{p.category}</p>
              <p className="text-foreground text-sm font-medium group-hover:text-primary transition-colors">{p.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectDetail;
