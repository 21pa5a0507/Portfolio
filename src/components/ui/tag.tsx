import type { ReactNode } from 'react';

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
