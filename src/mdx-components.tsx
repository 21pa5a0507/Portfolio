import type { MDXComponents } from 'mdx/types';
import { headingId } from '@/lib/content-validation';
import { ArchitectureDiagram } from '@/components/projects/architecture-diagram';

// MDX is trusted, version-controlled author content. Never compile visitor input.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, ...props }) => (
      <h2 {...props} id={headingId(String(children))} tabIndex={-1}>
        {children}
      </h2>
    ),
    ArchitectureDiagram,
    ...components,
  };
}
