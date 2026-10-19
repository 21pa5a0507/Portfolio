import type { MetadataRoute } from 'next';
import { canonicalUrl, indexingEnabled } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexingEnabled()
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: canonicalUrl('/sitemap.xml'),
  };
}
