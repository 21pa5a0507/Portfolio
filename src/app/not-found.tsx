import { ActionLink } from '@/components/ui/action-link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'The requested page could not be found. Return to Kishore Kattiri’s engineering portfolio.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="container section">
      <p className="eyebrow">404 / Page not found</p>
      <h1 className="my-6">This path ends here.</h1>
      <p className="mb-8 text-muted">
        The page may have moved, or the address may be incorrect.
      </p>
      <ActionLink href="/" primary>
        Back to home
      </ActionLink>
    </main>
  );
}
