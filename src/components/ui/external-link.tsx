import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import type { PublicUrl } from '@/lib/types';

export function ExternalLink({
  href,
  children,
  className = 'text-link',
}: {
  href: PublicUrl;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
