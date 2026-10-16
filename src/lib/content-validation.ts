import type { Project } from '@/lib/types';

export interface ContentSection {
  id: string;
  title: string;
}
export interface ProjectSource {
  filename: string;
  source: string;
}

export function headingId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function extractSections(source: string): ContentSection[] {
  return [...proseSource(source).matchAll(/^## (.+)$/gm)].map((match) => ({
    title: match[1]!.trim(),
    id: headingId(match[1]!),
  }));
}

// Ignore example headings inside fenced code when building the contents list.
function proseSource(source: string) {
  let fence = '';
  return source
    .split(/\r?\n/)
    .map((line) => {
      const marker = /^\s{0,3}(`{3,}|~{3,})/.exec(line)?.[1];
      if (marker) {
        if (!fence) fence = marker;
        else if (marker[0] === fence[0] && marker.length >= fence.length)
          fence = '';
        return '';
      }
      return fence ? '' : line;
    })
    .join('\n');
}

export function validateProjectContent(
  projects: readonly Project[],
  files: readonly ProjectSource[],
) {
  const slugs = new Set<string>();
  for (const project of projects) {
    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) ||
      slugs.has(project.slug)
    )
      throw new Error(`Invalid or duplicate project slug: ${project.slug}`);
    slugs.add(project.slug);
    if (
      !project.title.trim() ||
      !project.description.trim() ||
      !project.category.trim()
    )
      throw new Error(`Missing metadata: ${project.slug}`);
    for (const url of [project.demoUrl, project.repositoryUrl]) {
      if (url !== undefined) {
        const parsed = new URL(url);
        if (parsed.protocol !== 'https:' || parsed.username || parsed.password)
          throw new Error(
            `Public links must use HTTPS without credentials: ${project.slug}`,
          );
      }
    }
    if (project.slug === 'hexpilot' && project.repositoryUrl)
      throw new Error('HexPilot repository is private; omit repositoryUrl.');
    const matching = files.filter(
      (file) => file.filename === `${project.slug}.mdx`,
    );
    if (matching.length !== 1)
      throw new Error(`Expected one MDX file for ${project.slug}`);
    const source = matching[0]!.source;
    if (/^# /m.test(proseSource(source)))
      throw new Error(
        `Use level-two headings; the page supplies H1: ${project.slug}`,
      );
    const sections = extractSections(source);
    if (
      sections.some(({ title }) =>
        [...title].some((character) => '*_`<>[]'.includes(character)),
      )
    )
      throw new Error(`Use plain-text section headings: ${project.slug}`);
    if (
      !sections.some((section) => section.title === 'Overview') ||
      sections.length < 2
    )
      throw new Error(
        `Case study needs Overview and at least one other section: ${project.slug}`,
      );
    const ids = sections.map((section) => section.id);
    if (ids.some((id) => !id) || new Set(ids).size !== ids.length)
      throw new Error(`Empty or duplicate section IDs: ${project.slug}`);
  }
  for (const file of files) {
    if (!slugs.has(file.filename.replace(/\.mdx$/, '')))
      throw new Error(`MDX has no project metadata: ${file.filename}`);
  }
}
