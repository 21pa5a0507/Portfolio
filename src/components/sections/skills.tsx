import { homepageSkillGroups, skills } from '@/data/skills';
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
        A selection across backend development, product delivery, and practical
        AI engineering.
      </p>
      <div className="skills-grid">
        {homepageSkillGroups.map((selection, index) => {
          const group = skills.find(
            (item) => item.category === selection.category,
          );
          const selected =
            group?.items.filter((item) =>
              (selection.selected as readonly string[]).includes(item),
            ) ?? [];
          return (
            <div className="skill-group" key={selection.category}>
              <span className="group-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{selection.category}</h3>
              <ul>
                {selected.map((skill) => (
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
