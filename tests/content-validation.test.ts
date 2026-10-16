import { describe, expect, it, afterEach, vi } from 'vitest';
import { projects } from '@/data/projects';
import {
  extractSections,
  validateProjectContent,
} from '@/lib/content-validation';
import { canonicalUrl } from '@/lib/site';
import type { Project } from '@/lib/types';

const project = projects.find((entry) => entry.slug === 'hexpilot')!;
const valid = {
  filename: `${project.slug}.mdx`,
  source:
    '## Overview\n\nA factual overview.\n\n## Technical implementation\n\nSupplied details.',
};

describe('project content contract', () => {
  it('accepts matching metadata and MDX and derives stable anchor IDs', () => {
    expect(() => validateProjectContent([project], [valid])).not.toThrow();
    expect(extractSections(valid.source)).toEqual([
      { title: 'Overview', id: 'overview' },
      { title: 'Technical implementation', id: 'technical-implementation' },
    ]);
  });
  it('rejects a missing case study', () => {
    expect(() => validateProjectContent([project], [])).toThrow(
      'Expected one MDX',
    );
  });
  it('ignores sample headings inside fenced code', () => {
    const source = valid.source + '\n```md\n# Example only\n## Overview\n```\n';
    expect(() =>
      validateProjectContent([project], [{ ...valid, source }]),
    ).not.toThrow();
    expect(extractSections(source)).toHaveLength(2);
  });
  it('rejects formatted section headings that would produce mismatched contents anchors', () => {
    expect(() =>
      validateProjectContent(
        [project],
        [{ ...valid, source: valid.source + '\n## **Extra**' }],
      ),
    ).toThrow('plain-text');
  });
  it('rejects orphan content and duplicate slugs', () => {
    expect(() => validateProjectContent([], [valid])).toThrow(
      'no project metadata',
    );
    expect(() => validateProjectContent([project, project], [valid])).toThrow(
      'duplicate project slug',
    );
  });
  it('rejects path traversal in slugs before source loading', () => {
    expect(() =>
      validateProjectContent([{ ...project, slug: '../private' }], []),
    ).toThrow('Invalid or duplicate');
  });
  it('rejects H1 headings and duplicate section anchors', () => {
    expect(() =>
      validateProjectContent(
        [project],
        [{ ...valid, source: '# A second page title\n' + valid.source }],
      ),
    ).toThrow('level-two');
    expect(() =>
      validateProjectContent(
        [project],
        [{ ...valid, source: valid.source + '\n## Overview' }],
      ),
    ).toThrow('duplicate section IDs');
  });
  it('rejects incomplete metadata or content without an overview', () => {
    expect(() =>
      validateProjectContent([{ ...project, title: '' }], [valid]),
    ).toThrow('Missing metadata');
    expect(() =>
      validateProjectContent(
        [project],
        [{ ...valid, source: '## Results\n\nNot enough.' }],
      ),
    ).toThrow('needs Overview');
  });
  it('rejects unsafe URLs and prevents accidental disclosure of the private repository', () => {
    // Simulate malformed input that bypassed TypeScript (for runtime validation).
    const unsafe = {
      ...project,
      demoUrl: 'http://example.com',
    } as unknown as Project;
    expect(() => validateProjectContent([unsafe], [valid])).toThrow('HTTPS');
    expect(() =>
      validateProjectContent(
        [{ ...project, repositoryUrl: 'https://example.com' }],
        [valid],
      ),
    ).toThrow('private');
  });
});

describe('canonical URLs', () => {
  afterEach(() => vi.unstubAllEnvs());
  it('omits a canonical origin when the domain has not been supplied', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    expect(canonicalUrl('/projects')).toBeUndefined();
  });
  it('uses a configured HTTPS origin', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');
    expect(canonicalUrl('/projects/hexpilot')).toBe(
      'https://example.com/projects/hexpilot',
    );
  });
  it('rejects an insecure URL or a path in the configured origin', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'http://example.com');
    expect(() => canonicalUrl('/projects')).toThrow('HTTPS origin');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com/portfolio');
    expect(() => canonicalUrl('/projects')).toThrow('HTTPS origin');
  });
});
