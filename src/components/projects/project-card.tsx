import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { Tag } from '@/components/ui/tag';
import { EngineeringDrawing } from '@/components/ui/engineering-drawing';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={`project-card ${project.featured ? 'project-featured' : 'project-supporting'}`}
    >
      <div className="project-preview">
        <div className="figure-label">
          <span>
            {project.context === 'personal'
              ? 'INDEPENDENT RESEARCH'
              : 'PRODUCTION ENGINEERING'}
          </span>
          <span aria-hidden="true">↗</span>
        </div>
        <EngineeringDrawing
          variant={project.slug === 'uem-compliance' ? 'endpoint' : 'retrieval'}
        />
      </div>
      <div className="project-copy">
        <p className="eyebrow">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="text-muted">{project.description}</p>
        <div className="project-tags">
          {project.technologies.slice(0, 5).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
        <Link
          className="project-case-link"
          href={`/projects/${project.slug}`}
          aria-label={`Read case study: ${project.title}`}
        >
          Read case study
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        {(project.demoUrl || project.repositoryUrl) && (
          <div className="project-external-actions">
            {project.demoUrl && (
              <a className="text-link" href={project.demoUrl}>
                Live demo
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
            {project.repositoryUrl && (
              <a className="text-link" href={project.repositoryUrl}>
                Source code
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
