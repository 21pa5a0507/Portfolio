import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/projects/project-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { ActionLink } from '@/components/ui/action-link';

export function Projects() {
  return (
    <section
      id="projects"
      tabIndex={-1}
      className="container section"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        number="02"
        label="Selected engineering"
        title="A closer look at the work."
        id="projects-title"
      />
      <p className="section-lede">
        Independent research alongside production engineering. Different
        contexts, the same attention to useful software.
      </p>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-8">
        <ActionLink href="/projects">View all projects</ActionLink>
      </div>
    </section>
  );
}
