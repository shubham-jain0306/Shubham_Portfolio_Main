export interface FlipbookDocument {
  id: string;
  title: string;
  subtitle: string;
  pageCount: number;
  /** Paths to pre-rendered page images (1-indexed naming) */
  pages: string[];
  /** Path to the original PDF or file for download */
  pdfPath: string;
  /** Path to the cover/preview image */
  coverImage: string;
}

export interface SocialCarousel {
  id: string;
  title: string;
  subtitle: string;
  slides: string[];
  aspectRatio?: string;
}

export interface MetaAdItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  aspectRatio?: string;
}

export interface EmailerItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  fullImage: string;
}

export interface DigitalDisplayItem {
  id: string;
  title: string;
  image: string;
  caption?: string;
  aspectRatio?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  timeframe: string;
  tools: string;
  heroImage: string;
  description: string;
  secondaryImage: string;
  longDescription: string;
  galleryImages: { label: string; src: string; caption?: string }[];
  cardImage: string;
  projectsPageDescription?: string;
  accentColor?: string;
  badge?: string;
  /** Flipbook-enabled documents for this project */
  documents?: FlipbookDocument[];
  /** Whether this project has flipbook documents */
  hasFlipbook?: boolean;
  /** Interactive carousels for social media */
  carousels?: SocialCarousel[];
  /** Dedicated standalone Meta Ad inside Social Media */
  metaAd?: MetaAdItem;
  /** Curated emailers for digital communication */
  emailers?: EmailerItem[];
  /** Digital displays / screens */
  digitalDisplays?: DigitalDisplayItem[];
}

export const projects: Project[] = [
  {
    id: "bizzbuzz",
    slug: "bizzbuzz",
    title: "Psylief",
    subtitle: "Full Stack Application Development and Product-Based AI Solutions",
    category: "Branding and Identity",
    year: "2025",
    timeframe: "10 days",
    tools: "Adobe Illustrator",
    heroImage: "https://framerusercontent.com/images/Q6UidXs1NRzQMtDHhyuCVJrpq0A.jpg?width=1920&height=1080",
    description: "When Psylief Innovations expanded into Psylief Technologies, the vision was clear: build intelligent, user-first applications powered by AI. From enterprise-grade generative AI platforms to ed-tech solutions, their work embodies precision and innovation. I contributed to this journey by designing the logo a mark that captures their drive to merge technology with human-centered design.",
    secondaryImage: "https://framerusercontent.com/images/ISee6ycXDQfDxuxOvMFcFNmKvs.jpg",
    longDescription: "A leading firm specializing in Full Stack Application Development and Product-Based AI Solutions. With a strong emphasis on a user-centric approach, Psylief Technologies is dedicated to delivering planned, data-driven designs that prioritize smooth user experiences. Our applications are enhanced with the latest in Artificial Intelligence and Machine Learning technologies. Services Offered: UI/UX Designing with Prototyping Full Stack Application Development Backend/Frontend Only Development Branding and Designing Technologies Used: Backend: NodeJS, NestJS, Python, FastAPI, Flask, Redis. Frontend: Angular, Flutter, Redux. Database: SQL, Postgres, Mongo, Firebase. ML/AI: Python for ML/AI, PyTorch, TensorFlow. Notable Projects: Zero Systems, Inc.: Providing enterprise-grade generative AI solutions with Hercules platform. Catering to legal, accounting, and consulting firms. Electricity.ai. Inc.: An Ed-Tech platform offering tailored recommendations for users. Psylief Innovations Pvt. Ltd.: AI-powered Career Counseling with detailed reports based on 51 unique features. Products Offered: Email Automation IVR Services Document Digitization Form Extraction",
    galleryImages: [
      { label: "01", src: "https://framerusercontent.com/images/u82jEanixj1iWitwcjnRO7EM.jpg?width=1920&height=1080" },
      { label: "02", src: "https://framerusercontent.com/images/8gZkuVMELUeaFm9YaHH3OiuHIKI.jpg?width=1920&height=1080" },
      { label: "03", src: "https://framerusercontent.com/images/w4CXfhPnGDJGfZKCv9YdED1hA.jpg?width=1920&height=1080" },
      { label: "04", src: "https://framerusercontent.com/images/x3DE7I2ftCeq8ZP0I018K4qI0Eo.jpg?width=1920&height=1080" },
    ],
    cardImage: "https://framerusercontent.com/images/Q6UidXs1NRzQMtDHhyuCVJrpq0A.jpg?width=1920&height=1080",
    projectsPageDescription: "Full Stack Application Development and Product-Based AI Solutions",
    accentColor: "#1a6fb5",
  },
  {
    id: "aquaflow",
    slug: "aquaflow",
    title: "Hackingly",
    subtitle: "Hackingly is an innovative platform dedicated to empowering aspiring tech professionals.",
    category: "Branding and Identity",
    year: "2025",
    timeframe: "8",
    tools: "Adobe Illustrator, Photoshop",
    heroImage: "https://framerusercontent.com/images/RntrJz47q3WxuUrX9CBXngEa4.png?width=4000&height=3000",
    description: "Hackingly is a platform that offers various resources and opportunities for tech enthusiasts of all skill levels. Organize fun hackathons and boot camps that encourage teamwork and creativity, and provide mentorship from experienced professionals who can guide you on your journey in the tech industry.",
    secondaryImage: "https://framerusercontent.com/images/sZMicXmt3lPyWwsEB9aGfBGMOA.png",
    longDescription: "Hackingly began with a simple belief: that great ideas can come from anyone, anywhere they just need the right spark. Born from countless late-night coding sessions, coffee-fueled problem-solving, and the thrill of building something from nothing, Hackingly grew into a space where creators don't just learn technology, they experience it. It\u2019s a place where a beginner\u2019s curiosity meets a mentor\u2019s guidance, where strangers become teams, and ideas evolve into prototypes, startups, and careers. Hackingly symbolizes ignition the moment a bright spark turns into innovation. It stands for the fearless builder, the dreamer who takes action, the community that uplifts each other, and the unstoppable momentum of people shaping the future through code. The logo should reflect this energy: bold, futuristic, collaborative, and always in motion just like the innovators who call Hackingly home.",
    galleryImages: [
      { label: "01", src: "https://framerusercontent.com/images/sZMicXmt3lPyWwsEB9aGfBGMOA.png?width=3840&height=2800", caption: "NFC Card Case" },
      { label: "02", src: "https://framerusercontent.com/images/WGxdhw67owZUJaP4lJgUdH15L4.png?width=3840&height=2800", caption: "Website" },
      { label: "03", src: "https://framerusercontent.com/images/QdjQxTlX5H8Rr1TDf51HomN4Xss.png?width=3840&height=2800", caption: "Branding in Hackathon" },
      { label: "04", src: "https://framerusercontent.com/images/CpVGmCL49DPnb3NKp8auHBSHM.png?width=3840&height=2160" },
    ],
    cardImage: "https://framerusercontent.com/images/RntrJz47q3WxuUrX9CBXngEa4.png?width=4000&height=3000",
    projectsPageDescription: "Hackingly is an innovative platform dedicated to empowering aspiring tech professionals.",
    accentColor: "#2233bb",
  },
  {
    id: "snackify",
    slug: "snackify",
    title: "UI Design",
    subtitle: "Platform showcasing hackathon events, services, community growth, and tools for organizing business and community hackathons.",
    category: "UI/UX",
    year: "2025",
    timeframe: "15 Days",
    tools: "Figma",
    heroImage: "https://framerusercontent.com/images/OOo1tj7NRaROI4s9RQ24mJBsGU.png?width=5000&height=3500",
    description: "The Hackingly website was designed in Figma to capture the spirit of opportunity and community. From the bold hero section that welcomes users with the promise of connecting them to their dream careers, to the clear navigation and event highlights, every element was crafted to inspire action. The services grid and impact metrics showcase the platform\u2019s value, while FAQs and a strong call-to-action build trust and engagement. The design blends vibrant visuals with a structured layout, making Hackingly feel approachable, energetic, and purpose-driven.",
    secondaryImage: "https://framerusercontent.com/images/tOBgNaiTWgM0PM3o7j9NJa0NWo.png",
    longDescription: "",
    galleryImages: [
      { label: "01", src: "https://framerusercontent.com/images/6R1BrTOECgj2G1bkUTn1JJOxY3A.png?lossless=1&width=4500&height=3500", caption: "Designed to streamline hackathon organization for communities and businesses. The layout highlights Hackingly\u2019s mission, offers tailored entry points, and features a clean form for business onboarding all wrapped in a vibrant, intuitive interface." },
    ],
    cardImage: "https://framerusercontent.com/images/OOo1tj7NRaROI4s9RQ24mJBsGU.png?width=5000&height=3500",
    projectsPageDescription: "Platform showcasing hackathon events, services, community growth, and tools for organizing business and community hackathons.",
    accentColor: "#333333",
  },
  {
    id: "zengo",
    slug: "zengo",
    title: "Label",
    subtitle: "Proposal label design hard seltzer brand, crafted to capture freshness, vibrancy, and modern appeal.",
    category: "Label and Packaging",
    year: "2023",
    timeframe: "16 days",
    tools: "Adobe Illustrator, Photoshop",
    heroImage: "https://framerusercontent.com/images/OyoVmmYiq1JYt8fuR06zM8W6Bjk.png?width=3000&height=2250",
    description: "Exploratory design proposal for Showtz, a hard seltzer brand founded in Mumbai. The project focused on crafting a label identity that balances clarity with bold storytelling, offering the founders a vision for how their product could stand out on shelves.",
    secondaryImage: "https://framerusercontent.com/images/mNZV6cl5eTZV5k8CgmbsJHO9Q.png",
    longDescription: "I have designed packaging and branding for multiple brands across diverse industries, creating identities that balance clarity, storytelling, and visual impact. Each project reflects a tailored approach whether it\u2019s crafting bold label systems, developing cohesive brand narratives, or shaping packaging that connects with audiences.",
    galleryImages: [
      { label: "01", src: "https://framerusercontent.com/images/zjRnu0pRnirVkn2Uvb5HdrGjmQ.png?width=1632&height=1080" },
      { label: "02", src: "https://framerusercontent.com/images/Wf8aeZw31gdZHZZa0ilZv7oyIzw.png?width=4500&height=3000" },
      { label: "03", src: "https://framerusercontent.com/images/9LdrwFHSjZDjE3F2GsRopAMv3WU.png?width=5644&height=3790" },
    ],
    cardImage: "https://framerusercontent.com/images/OyoVmmYiq1JYt8fuR06zM8W6Bjk.png?width=3000&height=2250",
    projectsPageDescription: "Proposal label design hard seltzer brand, crafted to capture freshness, vibrancy, and modern appeal.",
    accentColor: "#8B6914",
  },
  {
    id: "roverride",
    slug: "roverride",
    title: "Creative Communication",
    subtitle: "A showcase of brand campaigns and social media content crafted for impact and engagement.",
    category: "Social Media",
    year: "2022-2025",
    timeframe: "Start 2022",
    tools: "Adobe Illustrator, Photoshop",
    heroImage: "https://framerusercontent.com/images/cOqZQBOLr3HgpJ1GFqb5XJ9UCQ.png?width=1920&height=1080",
    description: "This section features social media creatives designed for a diverse range of brands including Psylief, Hackingly, Triumb, Mugdog, Stratigo, Ratan Rani, Vyapar Catalyst, Hackingly Innovators, Hanubyts, Care Sanctum, and Econeeti. Each project reflects a tailored approach to digital storytelling combining clarity, visual impact, and brand\u2011specific strategy to engage audiences across platforms.",
    secondaryImage: "https://framerusercontent.com/images/eJ8H96Op9C8B9DHfmP1n3ULlnEM.png",
    longDescription: "",
    galleryImages: [
      { label: "01", src: "https://framerusercontent.com/images/kOo8k23X9ekAgaVVvDqpooJwGCg.png?width=1920&height=1080" },
      { label: "02", src: "https://framerusercontent.com/images/jIqzDw1Oa1NAgIyQJtv7CxWbo.png?width=1920&height=1080" },
      { label: "03", src: "https://framerusercontent.com/images/6urxqJti1zUaeOitwJa3YbU9yXI.png?width=8361&height=5269" },
      { label: "04", src: "https://framerusercontent.com/images/Huv2M9i7V5Rlt7ny2bKts7PG4v4.png?width=2000&height=1265" },
      { label: "05", src: "https://framerusercontent.com/images/XlYH9RMBNPZiyGmq2b7zOEwPa2Y.png?width=2000&height=1265" },
      { label: "06", src: "https://framerusercontent.com/images/zh4DGTIjnCdfNJUOV7VF7kRebQc.png?width=2000&height=1265" },
    ],
    cardImage: "https://framerusercontent.com/images/cOqZQBOLr3HgpJ1GFqb5XJ9UCQ.png?width=1920&height=1080",
    projectsPageDescription: "A showcase of brand campaigns and social media content crafted for impact and engagement.",
    accentColor: "#1a1a3e",
    carousels: [
      {
        id: "carousel-1",
        title: "Brand Storytelling Carousel",
        subtitle: "Multi-slide narrative structure engineered for LinkedIn & Instagram feeds",
        slides: [
          "/assets/social-media/carousel-slide-01.jpg",
          "/assets/social-media/carousel-slide-02.jpg",
          "/assets/social-media/carousel-slide-03.jpg",
        ],
        aspectRatio: "1/1",
      },
      {
        id: "carousel-2",
        title: "Campaign Narrative Carousel",
        subtitle: "Four-part visual campaign sequence for community engagement & growth",
        slides: [
          "/assets/social-media/campaign-2/slide-01.png",
          "/assets/social-media/campaign-2/slide-02.png",
          "/assets/social-media/campaign-2/slide-03.png",
          "/assets/social-media/campaign-2/slide-04.png",
        ],
        aspectRatio: "1/1",
      },
    ],
    metaAd: {
      id: "meta-ad-creative",
      title: "Meta Paid Acquisition Creative",
      subtitle: "High-converting feed campaign visual engineered for conversion and stopping power",
      image: "/assets/social-media/meta-ad.png",
      badge: "META AD",
      aspectRatio: "1/1",
    },
  },
  {
    id: "print-presentation",
    slug: "print-presentation",
    title: "Print & Presentation",
    subtitle: "Brochures, pitch decks, company profiles and editorial layouts — document-based communication designed with clarity and information hierarchy.",
    category: "Print & Presentation",
    year: "2023-2025",
    timeframe: "Ongoing",
    tools: "Adobe InDesign, Illustrator, Photoshop",
    heroImage: "/assets/print-presentation/deloitte/page_01.png",
    description: "This collection demonstrates layout design, editorial thinking, typography and information hierarchy across corporate assessments, pitch decks, and brand brochures. Each document was designed to communicate with clarity and visual impact — presented here as interactive, page-by-page flipbook experiences.",
    secondaryImage: "/assets/print-presentation/brochure/page_01.png",
    longDescription: "Print and presentation design is where typography, layout, and information architecture converge. Each project here required a deep understanding of the audience, the message hierarchy, and the medium. From structured assessment reports for global consulting firms to commercially-driven brochure design, the work demonstrates versatility across editorial formats while maintaining an elevated standard of visual communication.",
    galleryImages: [],
    cardImage: "/assets/print-presentation/card-cover.png",
    projectsPageDescription: "Brochures, pitch decks, company profiles and editorial layouts — document-based communication designed with clarity and information hierarchy.",
    accentColor: "#2d3436",
    hasFlipbook: true,
    documents: [
      {
        id: "deloitte",
        title: "Deloitte Assignment 1.1",
        subtitle: "Professional assessment and corporate communication document",
        pageCount: 6,
        pages: [
          "/assets/print-presentation/deloitte/page_01.png",
          "/assets/print-presentation/deloitte/page_02.png",
          "/assets/print-presentation/deloitte/page_03.png",
          "/assets/print-presentation/deloitte/page_04.png",
          "/assets/print-presentation/deloitte/page_05.png",
          "/assets/print-presentation/deloitte/page_06.png",
        ],
        pdfPath: "/assets/print-presentation/docs/Deloitte Assignment 1.1.pdf",
        coverImage: "/assets/print-presentation/deloitte/page_01.png",
      },
      {
        id: "ey",
        title: "EY Assessment File",
        subtitle: "Strategic assessment and consulting presentation",
        pageCount: 5,
        pages: [
          "/assets/print-presentation/ey/page_01.png",
          "/assets/print-presentation/ey/page_02.png",
          "/assets/print-presentation/ey/page_03.png",
          "/assets/print-presentation/ey/page_04.png",
          "/assets/print-presentation/ey/page_05.png",
        ],
        pdfPath: "/assets/print-presentation/docs/EY Assessment File.pdf",
        coverImage: "/assets/print-presentation/ey/page_01.png",
      },
      {
        id: "brochure",
        title: "Company Profile Brochure",
        subtitle: "Brand communication and editorial layout design",
        pageCount: 8,
        pages: [
          "/assets/print-presentation/brochure/page_01.png",
          "/assets/print-presentation/brochure/page_02.png",
          "/assets/print-presentation/brochure/page_03.png",
          "/assets/print-presentation/brochure/page_04.png",
          "/assets/print-presentation/brochure/page_05.png",
          "/assets/print-presentation/brochure/page_06.png",
          "/assets/print-presentation/brochure/page_07.png",
          "/assets/print-presentation/brochure/page_08.png",
        ],
        pdfPath: "/assets/print-presentation/docs/Brochure.pdf",
        coverImage: "/assets/print-presentation/brochure/page_01.png",
      },
      {
        id: "manifesto",
        title: "Mood Magic Manifesto",
        subtitle: "23-page keepsake journal and brand manifesto from Psylief Workshop",
        pageCount: 23,
        pages: [
          "/assets/print-presentation/manifesto/page_01.jpg",
          "/assets/print-presentation/manifesto/page_02.jpg",
          "/assets/print-presentation/manifesto/page_03.jpg",
          "/assets/print-presentation/manifesto/page_04.jpg",
          "/assets/print-presentation/manifesto/page_05.jpg",
          "/assets/print-presentation/manifesto/page_06.jpg",
          "/assets/print-presentation/manifesto/page_07.jpg",
          "/assets/print-presentation/manifesto/page_08.jpg",
          "/assets/print-presentation/manifesto/page_09.jpg",
          "/assets/print-presentation/manifesto/page_10.jpg",
          "/assets/print-presentation/manifesto/page_11.jpg",
          "/assets/print-presentation/manifesto/page_12.jpg",
          "/assets/print-presentation/manifesto/page_13.jpg",
          "/assets/print-presentation/manifesto/page_14.jpg",
          "/assets/print-presentation/manifesto/page_15.jpg",
          "/assets/print-presentation/manifesto/page_16.jpg",
          "/assets/print-presentation/manifesto/page_17.jpg",
          "/assets/print-presentation/manifesto/page_18.jpg",
          "/assets/print-presentation/manifesto/page_19.jpg",
          "/assets/print-presentation/manifesto/page_20.jpg",
          "/assets/print-presentation/manifesto/page_21.jpg",
          "/assets/print-presentation/manifesto/page_22.jpg",
          "/assets/print-presentation/manifesto/page_23.jpg",
        ],
        pdfPath: "/assets/print-presentation/manifesto/page_01.jpg",
        coverImage: "/assets/print-presentation/manifesto/page_01.jpg",
      },
    ],
  },
  {
    id: "digital-communication",
    slug: "digital-communication",
    title: "Digital Communication",
    subtitle: "Emailers, digital screens and online promotional assets designed for email, display and web-based touchpoints.",
    category: "Digital Communication",
    year: "2023-2025",
    timeframe: "Ongoing",
    tools: "Adobe Illustrator, Photoshop, Figma",
    heroImage: "/assets/digital-communication/emailer-01.jpg",
    description: "Digital communication beyond social media — this section showcases a curated collection of emailers, digital screens, and interactive touchpoints. Each piece was designed for its specific screen environment, respecting visual hierarchy, responsive legibility, and conversion intent.",
    secondaryImage: "/assets/digital-communication/digital-screen-01.jpg",
    longDescription: "Designing for digital touchpoints requires a distinct sensibility. Emailers demand clear hierarchy, scannable typographic rhythm, and balanced proportions across screen sizes. Digital screens call for bold visual clarity that communicates instantly in high-tempo settings. This collection brings together unique emailers and display communications in a balanced, curated presentation.",
    galleryImages: [],
    emailers: [
      {
        id: "emailer-01",
        title: "Strategic Product Emailer",
        subtitle: "Clear typographic hierarchy, hero narrative, and targeted conversion CTA",
        image: "/assets/digital-communication/emailer-01.jpg",
        fullImage: "/assets/digital-communication/emailer-01.jpg",
      },
      {
        id: "emailer-02",
        title: "Promotional Campaign Emailer",
        subtitle: "High-contrast visual email layout structured for high engagement",
        image: "/assets/digital-communication/emailer-02.jpg",
        fullImage: "/assets/digital-communication/emailer-02.jpg",
      },
      {
        id: "newsletter-editorial",
        title: "Editorial Brand Newsletter",
        subtitle: "Structured newsletter design with editorial formatting and community updates",
        image: "/assets/digital-communication/newsletter.png",
        fullImage: "/assets/digital-communication/newsletter.png",
      },
      {
        id: "newsletter-hackingly",
        title: "Hackingly Community Newsletter",
        subtitle: "Comprehensive community dispatch crafted for builders, developers, and founders",
        image: "/assets/digital-communication/newsletter-hackingly.png",
        fullImage: "/assets/digital-communication/newsletter-hackingly.png",
      },
    ],
    digitalDisplays: [
      {
        id: "screen-01",
        title: "Digital Campaign Display (16:9)",
        image: "/assets/digital-communication/digital-screen-01.jpg",
        caption: "Widescreen high-resolution digital display designed for immediate visual recognition and event atmosphere.",
        aspectRatio: "16/9",
      },
      {
        id: "boarding-pass",
        title: "Digital Boarding Pass Touchpoint",
        image: "/assets/digital-communication/boarding-pass.png",
        caption: "Custom event boarding pass asset crafted with attention to ticket details and modern graphic styling.",
        aspectRatio: "2.57/1",
      },
    ],
    cardImage: "/assets/digital-communication/card-cover.png",
    projectsPageDescription: "Emailers, digital screens and online promotional assets designed for email, display and web-based touchpoints.",
    accentColor: "#0a3d62",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string): Project[] {
  return projects.filter((p) => p.slug !== currentSlug);
}
