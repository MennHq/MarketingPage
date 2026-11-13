import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    'https://puplume.pet';

  const routes = [
    '',
    '/features',
    '/pricing',
    '/academy',
    '/health',
    '/legal/privacy',
    '/legal/terms',
    '/legal/refund',
    '/legal/cookies',
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/pricing' || route === '/features' ? 0.9 : 0.7,
  }));

  // Dynamically fetch public puppies whose owners have enabled search engine indexing (100% SEO)
  try {
    const convexUrl =
      process.env.VITE_CONVEX_URL ||
      process.env.NEXT_PUBLIC_CONVEX_URL ||
      "https://energetic-partridge-407.convex.cloud";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${convexUrl}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: "puppies:getPublicIndexablePuppySlugs",
        args: {},
      }),
      signal: controller.signal,
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data?.status === "success" && Array.isArray(data.value)) {
        const pupEntries: MetadataRoute.Sitemap = data.value.map((p: any) => ({
          url: `${baseUrl}/${encodeURIComponent(p.slug)}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }));
        return [...staticEntries, ...pupEntries];
      }
    }
  } catch (err) {
    console.error("Error fetching dynamic sitemap puppy slugs:", err);
  }

  return staticEntries;
}
