import type { BreadcrumbItem } from "@/components/layout/breadcrumbs";

/* ─── Organization (root layout) ─── */

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://raabyt.com/#organization",
    name: "Raabyt Technologies",
    legalName: "Raabyt Technologies Inc.",
    url: "https://raabyt.com",
    logo: "https://raabyt.com/images/raabyt-logo-full.png",
    description:
      "Raabyt is an enterprise software company that provides secure, AI-powered, on-premise solutions including ERP, CRM, HRM, DMS, Sales, Purchase, Finance, and Unified Firewall Management (UFM).",
    foundingDate: "2019",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 200, maxValue: 500 },
    areaServed: "Worldwide",
    knowsAbout: [
      "Enterprise Resource Planning",
      "Customer Relationship Management",
      "Human Resource Management",
      "Document Management Systems",
      "Unified Firewall Management",
      "On-Premise Software Deployment",
      "AI-Powered Enterprise Software",
    ],
    sameAs: [
      "https://linkedin.com/company/raabyt",
      "https://x.com/raabyt",
      "https://github.com/raabyt",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@raabyt.com",
        contactType: "sales",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        email: "support@raabyt.com",
        contactType: "customer support",
        availableLanguage: "English",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Arjun Mehta",
      jobTitle: "Chief Executive Officer",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── BreadcrumbList ─── */

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://raabyt.com${item.href}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── SoftwareApplication (product pages) ─── */

interface SoftwareAppProps {
  name: string;
  description: string;
  url: string;
  category?: string;
}

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  category = "BusinessApplication",
}: SoftwareAppProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Raabyt ${name}`,
    description,
    url: `https://raabyt.com${url}`,
    applicationCategory: category,
    operatingSystem: "On-Premise / Linux / Windows Server",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Contact sales for pricing",
    },
    provider: { "@id": "https://raabyt.com/#organization" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Article (blog posts) ─── */

interface ArticleProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  authorName: string;
  authorRole?: string;
  authorBio?: string;
  image?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  authorName,
  authorRole,
  authorBio,
  image,
}: ArticleProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://raabyt.com${url}`,
    datePublished,
    dateModified: datePublished,
    image: image || `https://raabyt.com/og?title=${encodeURIComponent(title)}`,
    author: {
      "@type": "Person",
      name: authorName,
      ...(authorRole ? { jobTitle: authorRole } : {}),
      ...(authorBio ? { description: authorBio } : {}),
      worksFor: {
        "@type": "Organization",
        name: "Raabyt Technologies",
      },
    },
    publisher: { "@id": "https://raabyt.com/#organization" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://raabyt.com${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── FAQPage ─── */

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Speakable ─── */

interface SpeakableProps {
  url: string;
  cssSelectors: string[];
}

export function SpeakableSchema({ url, cssSelectors }: SpeakableProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `https://raabyt.com${url}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── DefinedTerm (glossary) ─── */

interface DefinedTermProps {
  name: string;
  description: string;
  url: string;
}

export function DefinedTermSchema({ name, description, url }: DefinedTermProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name,
    description,
    url: `https://raabyt.com${url}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Raabyt Enterprise Software Glossary",
      url: "https://raabyt.com/resources/glossary",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── Person (leadership / authors) ─── */

interface PersonProps {
  name: string;
  jobTitle: string;
  description?: string;
  worksFor?: string;
  sameAs?: string[];
}

export function PersonSchema({ name, jobTitle, description, worksFor = "Raabyt Technologies", sameAs }: PersonProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    ...(description ? { description } : {}),
    worksFor: { "@id": "https://raabyt.com/#organization" },
    ...(sameAs ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─── TechArticle (guides) ─── */

interface TechArticleProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorRole: string;
  wordCount: number;
  keywords: string[];
}

export function TechArticleSchema(props: TechArticleProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: props.title,
    description: props.description,
    url: `https://raabyt.com${props.url}`,
    datePublished: props.datePublished,
    dateModified: props.dateModified,
    wordCount: props.wordCount,
    keywords: props.keywords.join(", "),
    image: `https://raabyt.com/og?title=${encodeURIComponent(props.title)}`,
    author: {
      "@type": "Person",
      name: props.authorName,
      jobTitle: props.authorRole,
      worksFor: { "@id": "https://raabyt.com/#organization" },
    },
    publisher: { "@id": "https://raabyt.com/#organization" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://raabyt.com${props.url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
