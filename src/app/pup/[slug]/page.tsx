import type { Metadata } from "next";
import { PublicPupView } from "./PublicPupView";
import { getPublicPuppy } from "@/lib/generatePupCardImage";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pup = await getPublicPuppy(slug);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    "https://petttttttpuplume.vercel.app";

  const canonicalUrl = `${baseUrl}/pup/${encodeURIComponent(slug)}`;
  const ogImageUrl = `${baseUrl}/pup/${encodeURIComponent(slug)}/opengraph-image`;
  const twitterImageUrl = `${baseUrl}/pup/${encodeURIComponent(slug)}/twitter-image`;

  if (!pup) {
    return {
      title: "Puppy Not Found | PupLume",
      description: `No active puppy collar tag found for "${slug}".`,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: "Puppy Passport Not Found",
        description: "This puppy tag is unregistered or mistyped.",
        url: canonicalUrl,
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
        description: "This puppy tag is unregistered or mistyped.",
        images: [twitterImageUrl],
      },
    };
  }

  const isEmergency = Boolean(pup.isLost);
  const title = isEmergency
    ? `🚨 MISSING PUPPY: Help find ${pup.name}! Contact & Safety Info`
    : `${pup.name}'s PupLume Pet Passport 🐾`;

  const breedText = pup.breed ? ` (${pup.breed})` : "";
  const rewardText = pup.rewardAmount ? `Reward: ${pup.rewardAmount}! ` : "";

  const description = isEmergency
    ? `EMERGENCY: ${pup.name}${breedText} is reported missing! ${rewardText}View emergency owner contacts, vet details, and safety notes immediately.`
    : `Meet ${pup.name}!${breedText}. Verified digital pet passport & smart collar safety tag on PupLume.`;

  return {
    title,
    description,
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

export default async function PupPage({ params }: PageProps) {
  const { slug } = await params;
  const pup = await getPublicPuppy(slug);

  return <PublicPupView puppy={pup} slug={slug} />;
}
