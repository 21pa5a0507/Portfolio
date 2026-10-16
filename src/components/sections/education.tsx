import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import { education, certifications } from '@/data/education';
import { achievements } from '@/data/achievements';
import { SectionHeading } from '@/components/ui/section-heading';

export function Education() {
  return (
    <section
      id="education"
      tabIndex={-1}
      className="container section education-section"
      aria-labelledby="education-title"
    >
      <SectionHeading
        number="05"
        label="Education & certifications"
        title="Foundations for what comes next."
        id="education-title"
      />
      <div className="education-layout">
        <div>
          {education.map((entry) => (
            <article className="education-entry" key={entry.degree}>
              <p className="education-years">
                {entry.startYear} — {entry.endYear}
              </p>
              <h3>{entry.degree}</h3>
              <p>{entry.institution}</p>
              <p className="text-muted">{entry.location}</p>
              <p className="education-result">{entry.result}</p>
            </article>
          ))}
        </div>
        <aside className="certification-panel" aria-label="Certification">
          <BadgeCheck size={28} strokeWidth={1.3} aria-hidden="true" />
          <p className="eyebrow">Continued learning</p>
          {certifications.map((cert) => (
            <h3 key={cert.title}>{cert.title}</h3>
          ))}
          <p className="text-muted">Agentic AI foundations</p>
        </aside>
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section
      id="achievements"
      tabIndex={-1}
      className="container section achievement-section"
      aria-labelledby="achievements-title"
    >
      <SectionHeading
        number="06"
        label="Recognition"
        title="Ideas put into practice."
        id="achievements-title"
      />
      {achievements.map((achievement) => (
        <article className="achievement-row" key={achievement.title}>
          <span className="achievement-marker" aria-hidden="true">
            TOP 3<span>FINALIST</span>
          </span>
          <div>
            <h3>{achievement.title}</h3>
            <p className="text-muted">{achievement.description}</p>
          </div>
          <ArrowUpRight
            className="achievement-arrow"
            size={32}
            strokeWidth={1}
            aria-hidden="true"
          />
        </article>
      ))}
    </section>
  );
}
