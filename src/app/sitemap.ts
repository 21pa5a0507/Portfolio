import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { canonicalUrl, siteOrigin } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin()) return [];
  return [
    '/',
    '/projects',
    ...projects.map((project) => `/projects/${project.slug}`),
  ].map((path) => ({ url: canonicalUrl(path)! }));
}
