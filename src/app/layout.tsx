import type { Metadata, Viewport } from "next";
import { Grandstander, Outfit } from "next/font/google";
import { PostHogProvider } from "../components/PostHogProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const grandstander = Grandstander({
  variable: "--font-grandstander",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#FFF9F2",
  width: "device-width",
  initialScale: 1,
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://petttttttpuplume.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PupLume | Puppy Training App & Digital Organizer",
  description: "The ultimate intelligent companion for new dog parents. Track potty training, manage health records, and get AI-powered puppy training advice all in one app.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "PupLume | Puppy Training App & Digital Organizer",
    description: "The ultimate intelligent companion for new dog parents.",
    url: "/",
    siteName: "PupLume",
    images: [
      {
        url: "/og-marketing.png",
        width: 1200,
        height: 630,
        alt: "PupLume App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PupLume | Puppy Training App & Digital Organizer",
    description: "The ultimate intelligent companion for new dog parents.",
    images: ["/og-marketing.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD for Software Application
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PupLume",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "LifestyleApplication",
    "offers": {
      "@type": "Offer",
      "price": "24.99",
      "priceCurrency": "USD"
    },
    "description": "The ultimate intelligent companion for new dog parents. Track potty training, manage health records, and get AI-powered puppy training advice."
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${grandstander.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body className={`${outfit.className} min-h-full flex flex-col font-sans bg-[#FFF9F2] text-[#2C211B]`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
