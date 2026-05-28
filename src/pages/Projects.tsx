import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const logoImages = [
  {
    name: "Hackingly",
    light: "/logos/new/logo png.png",
    dark: "/logos/new/Logo.png",
    alt: "Hackingly logo - branding by Shubham Jain"
  },
  {
    name: "Ratan Rani",
    light: "/logos/new/x.png",
    dark: "/logos/new/x.png",
    alt: "Ratan Rani logo - branding by Shubham Jain",
    increasedSizeExtra: true
  },
  {
    name: "MC360",
    light: "/logos/new/Icon 1.png",
    dark: "/logos/new/Icon.png",
    alt: "MC360 logo - branding by Shubham Jain",
    increasedSize: true
  },
  {
    name: "Econeeti",
    light: "/logos/new/7.png",
    dark: "/logos/new/8.png",
    alt: "Econeeti logo - branding by Shubham Jain",
    increasedSize: true
  },
  {
    name: "Psylief",
    light: "/logos/new/Psy.svg",
    dark: "/logos/new/Psy_dark.svg",
    alt: "Psylief logo - branding by Shubham Jain"
  },
  {
    name: "Dakshina",
    light: "/logos/new/Final.png",
    dark: "/logos/new/Dakshiva logo 0.png",
    alt: "Dakshina logo - branding by Shubham Jain",
    increasedSize: true
  },
  {
    name: "SLM",
    light: "/logos/new/SLM.svg",
    dark: "/logos/new/SLM_dark.svg",
    alt: "SLM logo - branding by Shubham Jain",
    increasedSize: true
  },
  {
    name: "Vyapar",
    light: "/logos/new/1.png",
    dark: "/logos/new/2.png",
    alt: "Vyapar logo - branding by Shubham Jain"
  },
  {
    name: "Edu Eagle",
    light: "/logos/new/C.png",
    dark: "/logos/new/B.png",
    alt: "Edu Eagle logo - branding by Shubham Jain"
  },
  {
    name: "Illuminati Club",
    light: "/logos/new/Black.png",
    dark: "/logos/new/White.png",
    alt: "Illuminati Club logo - branding by Shubham Jain",
    increasedSize: true
  },
  {
    name: "Hackingly Innovators",
    light: "/logos/new/Innovators final.png",
    dark: "/logos/new/Innovators final.png",
    alt: "Hackingly Innovators logo - branding by Shubham Jain"
  },
  {
    name: "Mugdog",
    light: "/logos/new/Mugdog_logo.png",
    dark: "/logos/new/Mugdog_logo.png",
    alt: "Mugdog logo - branding by Shubham Jain"
  },
  {
    name: "Queen Bee",
    light: "/logos/new/Queens (1).svg",
    dark: "/logos/new/Queens (1).svg",
    alt: "Queen Bee logo - branding by Shubham Jain",
    increasedSize: true
  }
];

const row1Indices = [0, 1, 2, 3];
const row2Indices = [4, 5, 6, 7];
const row3Indices = [8, 9, 10, 11, 12];

const getLogoSizeClasses = (logo: any) => {
  if (logo.increasedSizeExtra) {
    return "max-h-[50px] max-w-[172px] sm:max-h-[62px] sm:max-w-[202px] md:max-h-[75px] md:max-w-[235px]";
  }
  if (logo.increasedSize) {
    return "max-h-[40px] max-w-[138px] sm:max-h-[50px] sm:max-w-[162px] md:max-h-[60px] md:max-w-[188px]";
  }
  return "max-h-8 max-w-[110px] sm:max-h-10 sm:max-w-[130px] md:max-h-12 md:max-w-[150px]";
};

const Projects = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isDark, setIsDark] = useState(() => 
    !document.documentElement.classList.contains("light")
  );

  useEffect(() => {
    setIsDark(!document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (api && lightboxIndex !== null) {
      api.scrollTo(lightboxIndex, true);
    }
  }, [api, lightboxIndex]);

  // Autoplay endless carousel
  useEffect(() => {
    if (!api || lightboxIndex === null) return;

    let autoplayId: any = null;

    const startAutoplay = () => {
      stopAutoplay();
      autoplayId = setInterval(() => {
        api.scrollNext();
      }, 3000);
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    startAutoplay();

    // Pause autoplay on user interaction
    api.on("pointerDown", stopAutoplay);
    // Resume autoplay when the transition settles
    api.on("settle", startAutoplay);

    return () => {
      stopAutoplay();
      api.off("pointerDown", stopAutoplay);
      api.off("settle", startAutoplay);
    };
  }, [api, lightboxIndex]);

  const title = "Projects - Shubham Jain";
  const description = "Selected projects by Shubham Jain - branding, identity, logo design, packaging, and creative direction.";
  const canonical = `${SITE_URL}/projects`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.subtitle,
      url: `${SITE_URL}/work/${p.slug}`,
      image: p.cardImage,
      dateCreated: p.year,
      creator: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
      genre: p.category,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Projects", item: canonical },
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
        <script type="application/ld+json">{JSON.stringify(collectionJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-16 pb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground mb-16">Projects</h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed max-w-4xl text-left">
          Designing strategies and visuals that help brands connect deeply with their audiences.
        </p>
      </section>

      {/* Logo Design Section */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-12">
        <SectionLabel label="Logo Design" />
        <div className={`relative w-full overflow-hidden border-y border-neutral-200/50 mt-6 py-6 flex flex-col gap-6 group ${isDark ? "bg-black" : "bg-neutral-50"}`}>
          {/* Row 1 */}
          <div className="relative flex overflow-hidden w-full">
            <div 
              className="flex shrink-0 gap-6 animate-marquee-ltr group-hover:[animation-play-state:paused] w-max"
              style={{ '--speed': '25s' } as React.CSSProperties}
            >
              {Array(4).fill(row1Indices).flat().map((originalIndex, itemIndex) => {
                const logo = logoImages[originalIndex];
                const sizeClasses = getLogoSizeClasses(logo);
                return (
                  <button
                    key={`row1-${originalIndex}-${itemIndex}`}
                    type="button"
                    onClick={() => setLightboxIndex(originalIndex)}
                    aria-label={`Open ${logo.alt} in viewer`}
                    className="group/logo relative h-20 sm:h-24 md:h-28 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-white border border-neutral-200/60 rounded-xl transition-all duration-500 ease-out focus:outline-none shrink-0 w-36 sm:w-48 md:w-56 shadow-sm"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03), transparent 70%)",
                      }}
                    />
                    <img
                      src={logo.light}
                      alt={logo.alt}
                      loading="lazy"
                      className={`relative z-10 ${sizeClasses} w-auto h-auto object-contain transition-all duration-500 ease-out grayscale brightness-0 opacity-35 group-hover/logo:grayscale-0 group-hover/logo:brightness-100 group-hover/logo:opacity-85 group-hover/logo:contrast-90 group-hover/logo:-translate-y-1 group-hover/logo:scale-105`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative flex overflow-hidden w-full">
            <div 
              className="flex shrink-0 gap-6 animate-marquee-ltr group-hover:[animation-play-state:paused] w-max"
              style={{ '--speed': '35s' } as React.CSSProperties}
            >
              {Array(4).fill(row2Indices).flat().map((originalIndex, itemIndex) => {
                const logo = logoImages[originalIndex];
                const sizeClasses = getLogoSizeClasses(logo);
                return (
                  <button
                    key={`row2-${originalIndex}-${itemIndex}`}
                    type="button"
                    onClick={() => setLightboxIndex(originalIndex)}
                    aria-label={`Open ${logo.alt} in viewer`}
                    className="group/logo relative h-20 sm:h-24 md:h-28 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-white border border-neutral-200/60 rounded-xl transition-all duration-500 ease-out focus:outline-none shrink-0 w-36 sm:w-48 md:w-56 shadow-sm"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03), transparent 70%)",
                      }}
                    />
                    <img
                      src={logo.light}
                      alt={logo.alt}
                      loading="lazy"
                      className={`relative z-10 ${sizeClasses} w-auto h-auto object-contain transition-all duration-500 ease-out grayscale brightness-0 opacity-35 group-hover/logo:grayscale-0 group-hover/logo:brightness-100 group-hover/logo:opacity-85 group-hover/logo:contrast-90 group-hover/logo:-translate-y-1 group-hover/logo:scale-105`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3 */}
          <div className="relative flex overflow-hidden w-full">
            <div 
              className="flex shrink-0 gap-6 animate-marquee-ltr group-hover:[animation-play-state:paused] w-max"
              style={{ '--speed': '30s' } as React.CSSProperties}
            >
              {Array(4).fill(row3Indices).flat().map((originalIndex, itemIndex) => {
                const logo = logoImages[originalIndex];
                const sizeClasses = getLogoSizeClasses(logo);
                return (
                  <button
                    key={`row3-${originalIndex}-${itemIndex}`}
                    type="button"
                    onClick={() => setLightboxIndex(originalIndex)}
                    aria-label={`Open ${logo.alt} in viewer`}
                    className="group/logo relative h-20 sm:h-24 md:h-28 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-white border border-neutral-200/60 rounded-xl transition-all duration-500 ease-out focus:outline-none shrink-0 w-36 sm:w-48 md:w-56 shadow-sm"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03), transparent 70%)",
                      }}
                    />
                    <img
                      src={logo.light}
                      alt={logo.alt}
                      loading="lazy"
                      className={`relative z-10 ${sizeClasses} w-auto h-auto object-contain transition-all duration-500 ease-out grayscale brightness-0 opacity-35 group-hover/logo:grayscale-0 group-hover/logo:brightness-100 group-hover/logo:opacity-85 group-hover/logo:contrast-90 group-hover/logo:-translate-y-1 group-hover/logo:scale-105`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Project Cards */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-20">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
            {project.projectsPageDescription && (
              <p className="text-muted-foreground text-sm mt-2 mb-4 max-w-xl">
                {project.projectsPageDescription}
              </p>
            )}
          </div>
        ))}
      </section>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && setLightboxIndex(null)}>
        <DialogContent className="max-w-5xl w-[95vw] bg-background/95 backdrop-blur-xl border-border/40 p-6 sm:p-10">
          <DialogTitle className="sr-only">Logo viewer</DialogTitle>
          {lightboxIndex !== null && (
            <Carousel
              setApi={setApi}
              opts={{ loop: true, startIndex: lightboxIndex }}
              className="w-full"
            >
              <CarouselContent>
                {logoImages.map((logo, i) => (
                  <CarouselItem key={i}>
                    <div className="flex items-center justify-center aspect-[16/10] bg-card/40 rounded-2xl border border-border/40">
                      <img
                        src={isDark ? logo.dark : logo.light}
                        alt={logo.alt}
                        className={`max-h-[70vh] max-w-[85%] w-auto h-auto object-contain ${
                          logo.name === "Queen Bee" && isDark ? "invert" : ""
                        }`}
                      />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      {logo.alt}
                    </p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 sm:-left-12" />
              <CarouselNext className="right-2 sm:-right-12" />
            </Carousel>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
};

export default Projects;
