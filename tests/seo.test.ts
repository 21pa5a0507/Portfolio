import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { canonicalUrl, indexingEnabled, socialImages } from '@/lib/site';
import {
  personData,
  projectData,
  serializeStructuredData,
} from '@/lib/structured-data';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { projects } from '@/data/projects';

describe('publication configuration', () => {
  beforeEach(() => {
    vi.stubEnv('SITE_INDEXING', 'false');
    vi.stubEnv('VERCEL_ENV', '');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
  });
  afterEach(() => vi.unstubAllEnvs());
  it('does not fabricate a domain or enable indexing before publication', () => {
    expect(indexingEnabled()).toBe(false);
    expect(sitemap()).toEqual([]);
    expect(socialImages()).toBeUndefined();
    expect(robots().rules).toEqual({ userAgent: '*', disallow: '/' });
    expect(personData().url).toBeUndefined();
  });
  it('enables production indexing only with an explicit real-origin setting', () => {
    vi.stubEnv('SITE_INDEXING', 'true');
    expect(indexingEnabled).toThrow('actual production origin');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');
    vi.stubEnv('VERCEL_ENV', 'production');
    expect(indexingEnabled()).toBe(true);
    expect(robots().rules).toEqual({ userAgent: '*', allow: '/' });
    expect(robots().sitemap).toBe('https://example.com/sitemap.xml');
    expect(sitemap().map((entry) => entry.url)).toEqual([
      'https://example.com/',
      'https://example.com/projects',
      ...projects.map((entry) => `https://example.com/projects/${entry.slug}`),
    ]);
    expect(socialImages()?.[0]?.url).toBe('https://example.com/social-preview');
    const project = projects.find((entry) => entry.slug === 'hexpilot')!;
    expect(projectData(project).url).toBe(
      canonicalUrl(`/projects/${project.slug}`),
    );
  });
  it('keeps branch previews out of indexing even when production indexing is enabled', () => {
    vi.stubEnv('SITE_INDEXING', 'true');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');
    vi.stubEnv('VERCEL_ENV', 'preview');
    expect(indexingEnabled()).toBe(false);
    expect(robots().rules).toEqual({ userAgent: '*', disallow: '/' });
  });
  it('rejects misspelled indexing settings', () => {
    vi.stubEnv('SITE_INDEXING', 'yes');
    expect(indexingEnabled).toThrow('true or false');
  });
  it('escapes script termination in structured data without corrupting its values', () => {
    const value = { headline: '</script><script>alert(1)</script>' };
    const serialized = serializeStructuredData(value);
    expect(serialized).not.toContain('<');
    expect(JSON.parse(serialized)).toEqual(value);
  });
});
