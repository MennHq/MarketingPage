import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    'https://petttttttpuplume.vercel.app';

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
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/pricing' || route === '/features' ? 0.9 : 0.7,
  }))
}
