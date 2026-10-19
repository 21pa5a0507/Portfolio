export function siteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configured) return undefined;
  const origin = new URL(configured);
  if (
    origin.protocol !== 'https:' ||
    origin.username ||
    origin.password ||
    origin.pathname !== '/' ||
    origin.search ||
    origin.hash
  )
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path or credentials.',
    );
  return origin;
}

export function canonicalUrl(path: string) {
  const origin = siteOrigin();
  return origin ? new URL(path, origin).toString() : undefined;
}

export function indexingEnabled() {
  const setting = process.env.SITE_INDEXING ?? 'false';
  if (setting !== 'true' && setting !== 'false')
    throw new Error('SITE_INDEXING must be true or false.');
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production')
    return false;
  if (setting === 'true' && !siteOrigin())
    throw new Error(
      'Indexing requires NEXT_PUBLIC_SITE_URL to be the actual production origin.',
    );
  return setting === 'true';
}

export function socialImages() {
  const url = canonicalUrl('/social-preview');
  return url
    ? [
        {
          url,
          width: 1200,
          height: 630,
          alt: 'Kishore Kattiri — AI Software Engineer. Backend and full-stack.',
        },
      ]
    : undefined;
}
