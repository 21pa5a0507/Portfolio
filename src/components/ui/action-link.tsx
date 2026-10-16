import Link from 'next/link';
import type { ReactNode } from 'react';

export function ActionLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <Link href={href} className={`action${primary ? ' action-primary' : ''}`}>
      {children}
    </Link>
  );
}
