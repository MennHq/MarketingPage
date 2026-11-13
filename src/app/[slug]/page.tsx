import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicPupView } from "../pup/[slug]/PublicPupView";
import { getPublicPuppy } from "@/lib/generatePupCardImage";

export const dynamic = "force-dynamic";

const RESERVED_SLUGS = [
  "academy",
  "checkout",
  "features",
  "health",
  "legal",
  "pricing",
  "pup",
  "safety",
  "api",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = (slug || "").toLowerCase().trim();

  if (RESERVED_SLUGS.includes(cleanSlug)) {
    return {};
  }

  const pup = await getPublicPuppy(cleanSlug);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://petttttttpuplume.vercel.app";

  const canonicalUrl = `${baseUrl}/${encodeURIComponent(cleanSlug)}`;
  const ogImageUrl = `${baseUrl}/${encodeURIComponent(cleanSlug)}/opengraph-image?v=20261113b`;
  const twitterImageUrl = `${baseUrl}/${encodeURIComponent(cleanSlug)}/twitter-image?v=20261113b`;

  if (!pup) {
    return {
      title: "Puppy Not Found | PupLume",
      description: `No active puppy collar tag found for "${slug}".`,
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: "Puppy Passport Not Found",
        description: `No active collar tag registered for "${slug}".`,
        url: canonicalUrl,
        siteName: "PupLume",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: "Puppy Passport Not Found",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Puppy Passport Not Found",
        description: `No active collar tag registered for "${slug}".`,
        images: [twitterImageUrl],
      },
    };
  }

  const isEmergency = Boolean(pup.isLost);
  const isAllowedToRank = pup.allowSearchIndexing !== false;

  const title = isEmergency
    ? `🚨 MISSING PUPPY: Help find ${pup.name}! Contact & Safety Info`
    : `${pup.name}'s PupLume Pet Passport 🐾`;

  const breedText = pup.breed ? ` (${pup.breed})` : "";
  const rewardText = pup.rewardAmount ? `Reward: ${pup.rewardAmount}! ` : "";

  const description = isEmergency
    ? `EMERGENCY: ${pup.name}${breedText} is reported missing! ${rewardText}View emergency owner contacts, vet details, and safety notes immediately.`
    : `Meet ${pup.name}!${breedText}. Verified digital pet passport & smart collar safety tag on PupLume.`;

  const keywords = isAllowedToRank
    ? [
        pup.name,
        `${pup.name} dog`,
        `${pup.name} puppy`,
        pup.breed,
        `${pup.breed} pet passport`,
        "verified digital pet passport",
        "smart dog collar tag",
        "pet safety tag",
        pup.microchipNumber ? `microchip ${pup.microchipNumber}` : "",
        isEmergency ? `lost dog ${pup.name}` : "",
        isEmergency ? `missing pet alert ${pup.name}` : "",
      ].filter(Boolean) as string[]
    : undefined;

  return {
    title,
    description,
    keywords,
    robots: isAllowedToRank
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: isEmergency ? undefined : "PupLume",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${pup.name} Digital Passport`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImageUrl],
    },
  };
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const cleanSlug = (slug || "").toLowerCase().trim();

  if (RESERVED_SLUGS.includes(cleanSlug)) {
    notFound();
  }

  const pup = await getPublicPuppy(cleanSlug);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://petttttttpuplume.vercel.app";

  const canonicalUrl = `${baseUrl}/${encodeURIComponent(cleanSlug)}`;

  // 100% Rich Schema.org JSON-LD Structured Data when search indexing is ON
  const isAllowedToRank = pup && pup.allowSearchIndexing !== false;
  const jsonLd = isAllowedToRank
    ? {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: `${pup.name}'s Verified Digital Pet Passport`,
        description: `Meet ${pup.name}! Verified digital pet passport & smart collar safety tag on PupLume.`,
        url: canonicalUrl,
        mainEntity: {
          "@type": "IndividualProduct",
          name: pup.name,
          image: pup.photoUrl,
          description: `${pup.name} is a ${pup.breed || "dog"}. ${pup.temperament || ""}`,
          identifier: pup.microchipNumber || `PL-${cleanSlug.toUpperCase()}-PUP`,
          category: "Canine Pet Passport",
          additionalProperty: [
            { "@type": "PropertyValue", name: "Breed", value: pup.breed || "Canine" },
            { "@type": "PropertyValue", name: "Sex", value: pup.sex },
            { "@type": "PropertyValue", name: "Weight", value: pup.weightLbs ? `${pup.weightLbs} lbs` : undefined },
            { "@type": "PropertyValue", name: "Status", value: pup.isLost ? "Reported Missing" : "Active Smart Tag" },
            { "@type": "PropertyValue", name: "Collar Tag ID", value: cleanSlug },
          ].filter((p) => Boolean(p.value)),
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <PublicPupView puppy={pup} slug={slug} />
    </>
  );
}
