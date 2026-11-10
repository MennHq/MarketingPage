import type { Metadata } from "next";
import { PublicPupView } from "./PublicPupView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPublicPuppy(slug: string) {
  try {
    const convexUrl =
      process.env.VITE_CONVEX_URL ||
      process.env.NEXT_PUBLIC_CONVEX_URL ||
      "https://energetic-partridge-407.convex.cloud";

    const res = await fetch(`${convexUrl}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "puppies:getPublicPuppyByTag",
        args: { identifier: slug.toLowerCase().trim() },
      }),
      next: { revalidate: 30 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (data?.status === "success" && data.value) {
      return data.value;
    }
  } catch (err) {
    console.error("Error fetching puppy from Convex:", err);
  }
  return null;
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

  if (!pup) {
    const notFoundImageUrl = `${baseUrl}/api/og/pup?slug=${encodeURIComponent(slug)}`;
    return {
      title: "Puppy Not Found | PupLume",
      description: `No active puppy collar tag found for "${slug}".`,
      alternates: {
        canonical: `${baseUrl}/pup/${encodeURIComponent(slug)}`,
      },
      openGraph: {
        title: "Puppy Passport Not Found",
        description: "This puppy tag is unregistered or mistyped.",
        url: `${baseUrl}/pup/${encodeURIComponent(slug)}`,
        images: [
          {
            url: notFoundImageUrl,
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
        images: [notFoundImageUrl],
      },
    };
  }

  const isEmergency = Boolean(pup.isLost);
  const title = isEmergency
    ? `🚨 MISSING PUPPY: Help find ${pup.name}! Contact & Safety Info`
    : `${pup.name}'s PupLume Pet Passport 🐾`;

  const breedText = pup.breed ? ` (${pup.breed})` : "";
  const rewardText = pup.rewardAmount ? `★ Reward: ${pup.rewardAmount}! ` : "";

  const description = isEmergency
    ? `EMERGENCY: ${pup.name}${breedText} is reported missing! ${rewardText}View emergency owner contacts, vet details, and safety notes immediately.`
    : `Meet ${pup.name}!${breedText}. Verified digital pet passport & smart collar safety tag on PupLume.`;

  // Dynamic OpenGraph passport card generated on the fly for EVERY puppy!
  const imageUrl = `${baseUrl}/api/og/pup?slug=${encodeURIComponent(slug)}&v=8`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/pup/${encodeURIComponent(slug)}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/pup/${encodeURIComponent(slug)}`,
      siteName: isEmergency ? undefined : "PupLume",
      images: [
        {
          url: imageUrl,
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
      images: [imageUrl],
    },
  };
}

export default async function PupPage({ params }: PageProps) {
  const { slug } = await params;
  const pup = await getPublicPuppy(slug);

  return <PublicPupView puppy={pup} slug={slug} />;
}
