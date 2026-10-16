export function canonicalUrl(path: string) {
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
  return new URL(path, origin).toString();
}
