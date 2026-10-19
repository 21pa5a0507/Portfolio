import { homepageSkillGroups } from '@/data/skills';
import { SectionHeading } from '@/components/ui/section-heading';

export function Skills() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      className="container section"
      aria-labelledby="skills-title"
    >
      <SectionHeading
        number="04"
        label="Technical toolkit"
        title="The tools behind the work."
        id="skills-title"
      />
      <p className="section-lede">
        AI engineering and retrieval, supported by backend development,
        full-stack delivery, and cloud tooling.
      </p>
      <div className="skills-grid">
        {homepageSkillGroups.map((selection, index) => {
          return (
            <div className="skill-group" key={selection.category}>
              <span className="group-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{selection.category}</h3>
              <ul>
                {selection.selected.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
