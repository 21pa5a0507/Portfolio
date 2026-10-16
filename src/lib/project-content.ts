import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { projects } from '@/data/projects';
import { extractSections } from '@/lib/content-validation';

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSections(slug: string) {
  // Call only after metadata lookup: the filename is never taken from arbitrary input.
  if (!findProject(slug)) throw new Error(`Unknown project: ${slug}`);
  return extractSections(
    readFileSync(
      join(process.cwd(), 'src/content/projects', `${slug}.mdx`),
      'utf8',
    ),
  );
}
