import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { findProject, getProjectSections } from '@/lib/project-content';
import { canonicalUrl } from '@/lib/site';
import { Tag } from '@/components/ui/tag';

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const url = canonicalUrl(`/projects/${slug}`);
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const sections = getProjectSections(slug);
  // Bundler-discovered local MDX files. Only known metadata slugs reach this import.
  const { default: Content } = await import(
    `../../../content/projects/${slug}.mdx`
  );
  return (
    <main id="main" tabIndex={-1} className="container case-study">
      <nav className="case-breadcrumb" aria-label="Breadcrumb">
        <Link href="/projects" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          All projects
        </Link>
        <span aria-hidden="true">/</span>
        <span>Case study</span>
      </nav>
      <header className="case-heading">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="case-description">{project.description}</p>
        <div className="project-tags">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        {(project.demoUrl || project.repositoryUrl) && (
          <div className="project-external-actions">
            {project.demoUrl && (
              <a className="action" href={project.demoUrl}>
                Live demo
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            {project.repositoryUrl && (
              <a className="action" href={project.repositoryUrl}>
                Source code
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </header>
      <div className="case-layout">
        <nav className="case-toc" aria-label="On this page">
          <p className="eyebrow">In this case study</p>
          <ol>
            {sections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article
          className="case-prose"
          aria-label={`${project.title} case study`}
        >
          <Content />
        </article>
      </div>
      <div className="case-bottom">
        <Link className="action" href="/projects">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to projects
        </Link>
        <Link className="text-link" href="/#contact">
          Discuss my work
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
