import { profile } from '@/data/profile';
import { education } from '@/data/education';
import { skills } from '@/data/skills';
import { canonicalUrl } from '@/lib/site';
import type { Project } from '@/lib/types';

export function personData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'Software Engineer',
    description: profile.seoDescription,
    url: canonicalUrl('/'),
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    sameAs: [profile.github, profile.linkedin],
    worksFor: { '@type': 'Organization', name: 'Hexnode' },
    alumniOf: education.map((entry) => ({
      '@type': 'EducationalOrganization',
      name: entry.institution,
    })),
    knowsAbout: skills.flatMap((group) => [...group.items]),
  };
}

export function projectData(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.description,
    articleSection: project.category,
    url: canonicalUrl(`/projects/${project.slug}`),
    author: { '@type': 'Person', name: profile.name, url: canonicalUrl('/') },
    about: [...project.technologies],
  };
}

export function serializeStructuredData(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
