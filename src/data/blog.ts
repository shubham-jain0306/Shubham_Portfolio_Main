export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "podcast-setup-branding-your-voice",
    title: "Podcast Setup: Branding Your Voice",
    date: "Nov 25, 2025",
    image:
      "https://framerusercontent.com/images/Gt9E7177gksahWAU6tVfyYS4DHk.jpeg?scale-down-to=1024&width=1600&height=1203",
    excerpt:
      "Your microphone captures sound. Your brand decides whether anyone listens twice. A look at building a podcast identity that sounds as intentional as it looks.",
    content: [
      "A podcast is more than a feed of audio files - it is a recurring promise to a listener. Before you ever press record, the visual and verbal cues around the show are already setting expectations: the cover art on a tiny phone tile, the music sting in the first three seconds, the cadence of the host's intro.",
      "Branding a podcast starts with a single sentence: who is this for, and what will it do for them? Once that is sharp, every other decision - typography, color, microphone choice, even pacing - becomes a downstream answer instead of a guess.",
      "On the visual side, treat the cover artwork as a logo, not a poster. It needs to read at 60×60 pixels in a crowded directory. High-contrast type, a single focal element, and a color you can own across episode art and social cuts will do more than any illustration.",
      "On the audio side, consistency is the brand. The same intro music, the same room tone, the same sign-off. Listeners do not consciously notice these patterns, but they feel the difference when they are missing - the show stops feeling like a place and starts feeling like a file.",
      "The setup in the photo above is intentional in exactly this way: warm lighting, one hero microphone, a clean desk. Nothing in the frame contradicts the show's promise. That is the whole job of branding - removing contradictions until only the message remains.",
    ],
  },
  {
    slug: "packaging-the-silent-sales-pitch",
    title: "Packaging: The Silent Sales Pitch",
    date: "Nov 25, 2025",
    image:
      "https://framerusercontent.com/images/BQwIXanohkStXdjgkAIm8WqLhvo.png?scale-down-to=1024&width=4000&height=2666",
    excerpt:
      "On a shelf full of competitors, packaging is the only salesperson the brand can afford to put everywhere. Here is how to make it speak clearly.",
    content: [
      "Packaging is the most under-respected surface in branding. It is the one piece of design a customer holds in their hand, photographs without being asked, and keeps in their home for weeks. And yet most products treat it as a wrapper instead of a pitch.",
      "A good package answers three questions in under two seconds: what is this, who is it for, and why should I care more than the thing next to it. Anything that does not serve those answers is decoration - and decoration is expensive when you are paying for shelf space.",
      "Hierarchy does most of the work. The brand mark, the product name, and the one differentiating claim should be readable from arm's length. Everything else - ingredients, certifications, fine print - earns its place only after a buyer has already leaned in.",
      "Material is part of the message. A matte uncoated stock whispers craft. A glossy foil shouts premium. A recycled kraft signals values. The customer does not articulate any of this, but their hand decides in the first half-second whether the product feels like them.",
      "When packaging is done well, the buyer never thinks about it. They just feel that the brand inside the box was worth the box. That is the silent sales pitch - invisible work that moves units.",
    ],
  },
  {
    slug: "low-poly-efficient-design",
    title: "Low Poly: Efficient Design",
    date: "Nov 25, 2025",
    image:
      "https://framerusercontent.com/images/WaHfGvdCeMmLOq58cHtCMiQ.png?scale-down-to=1024&width=1464&height=1296",
    excerpt:
      "Low-poly is not a nostalgia trip. It is a discipline that forces a designer to commit - to a silhouette, to a palette, to a single readable idea.",
    content: [
      "Every triangle in a low-poly composition is a decision. Unlike high-fidelity 3D, where detail can hide a weak concept, low-poly exposes the bones. If the silhouette does not work, the piece does not work - there is no texture map to rescue it.",
      "That constraint is the gift. Working with a small triangle budget pushes a designer to ask what is actually essential about the subject. A fox becomes a wedge of orange and a tail. A mountain becomes three planes of light. The brain happily fills in the rest.",
      "Color in low-poly is doing double duty. With no gradients to blend forms, each face has to read as both shape and shade. A two- or three-step palette per object - base, highlight, shadow - is usually enough. More than that and the geometry stops feeling intentional.",
      "Performance is the quiet bonus. Low-poly assets render fast, animate cheaply, and scale gracefully on slow devices. For product visuals, marketing scenes, and web-embedded 3D, that efficiency translates directly into a faster, more accessible experience.",
      "The style is having a moment again, but the principles outlast the trend: commit to silhouette, restrain the palette, and let the geometry carry the meaning. That is efficient design - fewer parts, more signal.",
    ],
  },
  {
    slug: "integrating-ai-tools-into-your-design-workflow",
    title: "Integrating AI Tools to Speed Up Your Design Workflow and Ideation",
    date: "Feb 6, 2022",
    image:
      "https://framerusercontent.com/images/Upa6jeaIcU36SqzliTzw9aDS1o.png?width=1080&height=1350",
    excerpt:
      "AI does not replace taste. It replaces the slow, repetitive parts of getting from blank canvas to first draft. Here is where it actually fits.",
    content: [
      "The fear that AI will replace designers misses what designers actually do. The valuable work is not pushing pixels - it is judgment. Choosing the right idea, framing the right problem, knowing when something is finished. AI tools accelerate the parts around that work, not the work itself.",
      "The clearest win is in early ideation. Generating twenty rough directions in ten minutes used to be a full afternoon. Now it is a prompt and a coffee. The designer's job shifts upstream: write a sharper brief, then curate ruthlessly.",
      "Asset production is the second win. Background removal, image upscaling, color variations, copy rewrites in three different tones - these were billable hours that nobody enjoyed. Letting tools handle them frees the team to spend time on the decisions that actually move a project.",
      "Where AI still struggles is consistency. A model can produce a beautiful one-off, but ask for the same character across twelve scenes, or the same brand voice across a full website, and the cracks show. That gap is exactly where a designer's system thinking earns its keep.",
      "The healthiest workflow treats AI like a fast, opinionated intern: great for first passes, terrible at unsupervised final delivery. Used that way, it does not threaten the craft - it gives the craft more room to breathe.",
    ],
  },
  {
    slug: "print-mastering-the-tangible-finish",
    title: "Print: Mastering the Tangible Finish",
    date: "Nov 25, 2025",
    image:
      "https://framerusercontent.com/images/6YdEH0yb4YczEaDuUp1nYbEAMk.png?scale-down-to=1024&width=4000&height=3000",
    excerpt:
      "Screens are infinite and forgiving. Print is finite and honest. Designing for paper is one of the fastest ways to sharpen taste.",
    content: [
      "Print does not let you A/B test. Once the file is at the press, the decisions are decisions. That finality changes how a designer works - every margin, every pairing, every ink choice gets one more pass because there is no patch later.",
      "The tangible finish is where the craft lives. The weight of the paper, the bite of an embossed mark, the soft sheen of a spot UV - these are details that a screen cannot reproduce, and they are exactly what makes print feel like a gift instead of a leaflet.",
      "Color management is the unglamorous half of the work. A vivid screen blue can land as a flat gray if the stock and the ink are wrong. Soft-proofing in the right profile, requesting press proofs, and trusting the printer's expertise are not optional steps - they are the difference between a finished piece and a near miss.",
      "Typography behaves differently on paper. Tracking that looks airy on a Retina display can feel loose at 100% on uncoated stock. A slightly heavier weight, a touch more leading, and a darker ink usually translate the on-screen design back into something the page can hold.",
      "The reward for all this care is a piece that someone keeps. A book on a shelf, a card pinned to a wall, a brochure that survives a tote bag. In a feed-scrolling world, a well-finished printed object is a quiet, durable form of attention.",
    ],
  },
];
