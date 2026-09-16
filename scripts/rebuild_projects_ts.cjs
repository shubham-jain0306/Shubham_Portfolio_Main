const fs = require('fs');

const orig = fs.readFileSync('F:/Shubham Website/Shubham_Portfolio_Main/src/data/projects.ts', 'utf8');

// Extract the original projects 0..3 (bizzbuzz, aquaflow, snackify, zengo)
function extractProject(txt, id) {
  const start = txt.indexOf('id: "' + id + '"');
  const openBrace = txt.lastIndexOf('{', start);
  // Find matching closing brace
  let depth = 0;
  let end = -1;
  for (let i = openBrace; i < txt.length; i++) {
    if (txt[i] === '{') depth++;
    else if (txt[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return txt.substring(openBrace, end);
}

const bizzbuzz = extractProject(orig, 'bizzbuzz');
const aquaflow = extractProject(orig, 'aquaflow');
const snackify = extractProject(orig, 'snackify');
const zengo = extractProject(orig, 'zengo');
const roverrideOrig = extractProject(orig, 'roverride');

console.log('Extracted projects successfully.');

const content = `export interface FlipbookDocument {
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
  ${bizzbuzz},
  ${aquaflow},
  ${snackify},
  ${zengo},
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
    description: "This section features social media creatives designed for a diverse range of brands including Psylief, Hackingly, Triumb, Mugdog, Stratigo, Ratan Rani, Vyapar Catalyst, Hackingly Innovators, Hanubyts, Care Sanctum, and Econeeti. Each project reflects a tailored approach to digital storytelling combining clarity, visual impact, and brand\\u2011specific strategy to engage audiences across platforms.",
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
    id: "meta-ads",
    slug: "meta-ads",
    title: "Meta Ads",
    subtitle: "Paid social advertising creatives and performance campaigns engineered for Meta platforms.",
    category: "Social Media",
    badge: "META AD",
    year: "2024",
    timeframe: "Ongoing",
    tools: "Adobe Illustrator, Photoshop",
    heroImage: "/assets/social-media/meta-ad.png",
    description: "Dedicated performance advertising creative designed for Meta (Facebook & Instagram) ad placements. Structured to capture attention within the first 1.5 seconds, communicate key value propositions instantly, and drive high click-through rates with clarity, contrast, and strong visual hierarchy.",
    secondaryImage: "/assets/social-media/meta-ad.png",
    longDescription: "Performance creative requires a dedicated design discipline. In paid advertising, every element—from the thumb-stopping focal point and typography hierarchy to the contrast and clear call-to-action—is engineered to engage audiences. This standalone campaign ad exemplifies strategic visual communication built specifically for paid feed placements.",
    galleryImages: [],
    cardImage: "/assets/social-media/meta-ad-cover.png",
    projectsPageDescription: "Paid advertising creatives engineered for conversion, clarity, and stopping power on Meta platforms.",
    accentColor: "#1877f2",
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
`;

fs.writeFileSync('src/data/projects.ts', content, 'utf8');
console.log('src/data/projects.ts written successfully.');
