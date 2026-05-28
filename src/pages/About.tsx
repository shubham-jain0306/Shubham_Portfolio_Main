import { Helmet } from "react-helmet-async";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";
import { BorderBeam } from "@/components/ui/border-beam";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, SOCIAL_PROFILES } from "@/lib/seo";

const workExperience = [
  { years: "2024- Now", company: "Hackingly", role: "Design Strategist", description: "Built Hackingly's brand from the ground up guiding design, leading teams, and driving creative across print, digital, and live campaigns." },
  { years: "2023 - 2024", company: "Psylief", role: "Lead Graphic Designer", description: "Shaped Psylief's visual identity with creative solutions tailored for diverse audiences, ensuring brand consistency throughout all communications." },
  { years: "2023- 2023", company: "The Cogent", role: "Graphic Designer", description: "Worked as a graphic designer, creating visual content for multiple brands across digital, video, and IT sectors." },
  { years: "2021 - 2022", company: "Freelance", role: "Graphic Designer", description: "Worked as a freelance graphic designer, delivering creative solutions across logos, packaging, branding, and social media for a range of clients and industries." },
  { years: "2020 - 2021", company: "KGK Group", role: "Internship Trainee (3 Months)", description: "" },
];

const tools = [
  { name: "Photoshop", icon: "https://framerusercontent.com/images/rFrWPG3izjCBNtK62obWfUi8c.png?width=768&height=749" },
  { name: "Illustrator", icon: "https://framerusercontent.com/images/ITWWglLj905ppVLwJoEMGVsnTNM.png?width=768&height=768" },
  { name: "InDesign", icon: "https://framerusercontent.com/images/N4uSimxBq3hf92EknLskURiK6wA.png?width=768&height=749" },
  { name: "Lightroom", icon: "https://framerusercontent.com/images/85T8XfXKK3a68NDJWrVr1JVH4.png?width=768&height=749" },
  { name: "Figma", icon: "https://framerusercontent.com/images/pr2mjUYVJ22ceydAtOX9RxsPvi0.png?width=1024&height=1024", level: "Basic" },
  { name: "Premiere Pro", icon: "https://framerusercontent.com/images/M3jv3p0M0fF1CbmNNG4Kl1S5Io.png?width=2101&height=2049", level: "Basic" },
  { name: "CapCut", icon: "https://framerusercontent.com/images/ypKOQSwREFWB7bwbTQALGKNqow.jpg?width=980&height=980", level: "Basic" },
  { name: "CorelDRAW", icon: "https://framerusercontent.com/images/RF3A82mBt8uTHE3AnARzTT6frRw.png?width=307&height=307", level: "Basic" },
  { name: "Framer", icon: "https://framerusercontent.com/images/sXkIJCFf7TGDjxeVFmVhUlEBp8.jpg?width=1600&height=1200", level: "Basic" },
];

const About = () => {
  const title = "About - Shubham Jain";
  const description = "Learn about Shubham Jain - 5+ years of experience in branding, identity design, and visual storytelling, based in Jaipur, Rajasthan.";
  const canonical = `${SITE_URL}/about`;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    jobTitle: "Brand and Identity Designer",
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    knowsAbout: ["Branding", "Identity Design", "Packaging", "UI/UX", "Visual Storytelling"],
    sameAs: SOCIAL_PROFILES,
    worksFor: workExperience.map((w) => ({
      "@type": "Organization",
      name: w.company,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "About", item: canonical },
    ],
  };

  return (
    <main>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="profile" />
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
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      {/* Hero */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pt-16 pb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground mb-16">About</h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed max-w-4xl text-left">
          Everything I make starts with a question and ends with intention.Hey, I'm a Brand and Identity designer.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <SectionLabel label="Experience" />
            <p className="text-2xl md:text-3xl font-medium text-foreground mt-4">05 years</p>
          </div>
          <div>
            <SectionLabel label="Location" />
            <p className="text-2xl md:text-3xl font-medium text-foreground mt-4">Jaipur, Rajasthan</p>
          </div>
          <div>
            <SectionLabel label="Freelance" />
            <p className="text-2xl md:text-3xl font-medium text-foreground mt-4">Available</p>
          </div>
        </div>
      </section>

      {/* Portrait + Hello */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src="https://framerusercontent.com/images/7aNfUJtqqDpldU14SvGDdpSww.jpg?width=2144&height=2259"
              alt="Portrait of Shubham Jain - brand and identity designer based in Jaipur, Rajasthan"
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
          <div>
            <SectionLabel label="Hello" />
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mt-4">
              A visual designer and brand strategist passionate about building experiences that bring real value to people. My work blends design, branding, and storytelling celebrating function over form while giving creativity the freedom to inspire.
            </p>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-16">
        <SectionLabel label="Work Experience" />
        <div className="space-y-0 mt-4">
          {workExperience.map((exp, i) => (
            <div key={i} className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4">
              <p className="text-muted-foreground text-sm font-mono">{exp.years}</p>
              <div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-1">{exp.company}</h3>
                <p className="text-muted-foreground text-sm mb-2">{exp.role}</p>
                {exp.description && (
                  <p className="text-muted-foreground/70 text-sm leading-relaxed">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-20 lg:px-6 pb-20">
        <SectionLabel label="stack" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {tools.map((tool) => (
            <div key={tool.name} className="border border-border rounded-lg p-4 flex flex-col items-center gap-3">
              <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
              <p className="text-foreground text-sm font-medium">{tool.name}</p>
              {tool.level && <p className="text-muted-foreground text-xs">{tool.level}</p>}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
