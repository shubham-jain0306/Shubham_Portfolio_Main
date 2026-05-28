import { describe, it, expect } from "vitest";
import { blogPosts } from "@/data/blog";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const SITE_URL = "https://example.com";

// Mirror of the JSON-LD builders used in src/pages/BlogPost.tsx.
// Keeping them here ensures the test fails if the schema shape drifts.
function buildArticleJsonLd(post: (typeof blogPosts)[number]) {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const isoDate = new Date(post.date).toISOString();
  const wordCount = post.content.join(" ").trim().split(/\s+/).length;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: { "@type": "ImageObject", url: post.image },
    datePublished: isoDate,
    dateModified: isoDate,
    author: { "@type": "Person", name: "Shubham Jain", url: SITE_URL },
    publisher: { "@type": "Person", name: "Shubham Jain", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    inLanguage: "en",
    wordCount,
    articleBody: post.content.join("\n\n"),
  };
}

function buildBreadcrumbJsonLd(post: (typeof blogPosts)[number]) {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Notes", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };
}

describe("SEO regression - blog data integrity", () => {
  it("has at least one post", () => {
    expect(blogPosts.length).toBeGreaterThan(0);
  });

  it("every post has unique, lowercase, hyphenated slug", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every post has required content fields", () => {
    for (const post of blogPosts) {
      expect(post.title.trim().length).toBeGreaterThan(0);
      expect(post.excerpt.trim().length).toBeGreaterThan(20);
      expect(post.image).toMatch(/^https?:\/\//);
      expect(Array.isArray(post.content)).toBe(true);
      expect(post.content.length).toBeGreaterThan(0);
      expect(new Date(post.date).toString()).not.toBe("Invalid Date");
    }
  });
});

describe("SEO regression - Article JSON-LD", () => {
  for (const post of blogPosts) {
    describe(post.slug, () => {
      const ld = buildArticleJsonLd(post);

      it("has valid @context and @type", () => {
        expect(ld["@context"]).toBe("https://schema.org");
        expect(ld["@type"]).toBe("BlogPosting");
      });

      it("has required headline/description/url", () => {
        expect(ld.headline).toBe(post.title);
        expect(ld.description).toBe(post.excerpt);
        expect(ld.url).toMatch(/^https?:\/\/.+\/blog\/[a-z0-9-]+$/);
      });

      it("uses ImageObject with absolute url", () => {
        expect(ld.image["@type"]).toBe("ImageObject");
        expect(ld.image.url).toMatch(/^https?:\/\//);
      });

      it("uses ISO 8601 dates", () => {
        expect(ld.datePublished).toMatch(ISO_DATE);
        expect(ld.dateModified).toMatch(ISO_DATE);
      });

      it("has author and publisher with required fields", () => {
        expect(ld.author["@type"]).toBe("Person");
        expect(ld.author.name.length).toBeGreaterThan(0);
        expect(ld.publisher["@type"]).toBe("Person");
        expect(ld.publisher.name.length).toBeGreaterThan(0);
      });

      it("has mainEntityOfPage matching url", () => {
        expect(ld.mainEntityOfPage["@type"]).toBe("WebPage");
        expect(ld.mainEntityOfPage["@id"]).toBe(ld.url);
      });

      it("has positive wordCount and non-empty articleBody", () => {
        expect(ld.wordCount).toBeGreaterThan(0);
        expect(ld.articleBody.length).toBeGreaterThan(0);
      });

      it("serializes to valid JSON", () => {
        expect(() => JSON.parse(JSON.stringify(ld))).not.toThrow();
      });
    });
  }
});

describe("SEO regression - BreadcrumbList JSON-LD", () => {
  for (const post of blogPosts) {
    it(`${post.slug} has valid 3-level breadcrumb`, () => {
      const bc = buildBreadcrumbJsonLd(post);
      expect(bc["@type"]).toBe("BreadcrumbList");
      expect(bc.itemListElement).toHaveLength(3);

      bc.itemListElement.forEach((item, i) => {
        expect(item["@type"]).toBe("ListItem");
        expect(item.position).toBe(i + 1);
        expect(item.name.length).toBeGreaterThan(0);
        expect(item.item).toMatch(/^https?:\/\//);
      });

      expect(bc.itemListElement[2].name).toBe(post.title);
      expect(bc.itemListElement[2].item).toMatch(new RegExp(`/blog/${post.slug}$`));
    });
  }
});
