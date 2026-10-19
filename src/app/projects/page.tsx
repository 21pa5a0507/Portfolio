import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/project-card';
import { canonicalUrl, socialImages } from '@/lib/site';

const description =
  'Engineering case studies by Kishore Kattiri: production enterprise software at Hexnode and independent GenAI research with HexPilot.';
export const metadata: Metadata = {
  title: 'Engineering projects',
  description,
  alternates: { canonical: canonicalUrl('/projects') },
  openGraph: {
    title: 'Engineering projects — Kishore Kattiri',
    description,
    type: 'website',
    url: canonicalUrl('/projects'),
    images: socialImages(),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering projects — Kishore Kattiri',
    description,
    images: socialImages(),
  },
};

export default function ProjectsPage() {
  return (
    <main id="main" tabIndex={-1} className="container project-index">
      <Link href="/#projects" className="back-link">
        <ArrowLeft size={15} aria-hidden="true" />
        Back to portfolio
      </Link>
      <header className="project-index-heading">
        <p className="eyebrow">Selected work / Engineering case studies</p>
        <h1>Software in practice.</h1>
        <p className="section-lede">
          Production product engineering at Hexnode, alongside independent
          research into intelligent applications. Explore the scope,
          implementation, and outcomes of each project.
        </p>
      </header>
      <h2 className="sr-only">Project case studies</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <p className="project-index-note">
        Professional case studies use conceptual diagrams and generalized
        descriptions. Personal research is labeled separately.
      </p>
    </main>
  );
}
