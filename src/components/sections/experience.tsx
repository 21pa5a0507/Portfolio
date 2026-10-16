import { ArrowDownRight } from 'lucide-react';
import { experience } from '@/data/experience';
import type { Experience as ExperienceEntry } from '@/lib/types';
import { formatMonth } from '@/lib/dates';
import { SectionHeading } from '@/components/ui/section-heading';

export function Experience() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="section experience-section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          number="01"
          label="Professional experience"
          title="Engineering where it matters."
          id="experience-title"
        />
        <div className="section-introduction">
          <p>
            Production software. Enterprise constraints.
            <br />
            End-to-end responsibility.
          </p>
          <p className="text-muted">
            Building an enterprise endpoint management product at Hexnode,
            across backend systems, security, and intelligent applications.
          </p>
        </div>
        <div className="timeline">
          {experience.map((entry: ExperienceEntry) => (
            <article
              className={`timeline-entry ${entry.endDate ? 'intern-entry' : 'current-entry'}`}
              key={`${entry.company}-${entry.startDate}`}
            >
              <div className="timeline-date">
                <span className="timeline-dot" />
                <p>
                  <time dateTime={entry.startDate}>
                    {formatMonth(entry.startDate)}
                  </time>
                  <span className="date-separator"> — </span>
                  {entry.endDate ? (
                    <time dateTime={entry.endDate}>
                      {formatMonth(entry.endDate)}
                    </time>
                  ) : (
                    <span className="current-label">Present</span>
                  )}
                </p>
                {!entry.endDate && (
                  <span className="timeline-context">
                    Enterprise SaaS
                    <br />
                    UEM / MDM
                  </span>
                )}
              </div>
              <div className="experience-card">
                <div className="experience-card-heading">
                  <div>
                    <p className="company-name">{entry.company}</p>
                    <h3>{entry.role}</h3>
                  </div>
                  {!entry.endDate && (
                    <ArrowDownRight
                      size={30}
                      className="text-accent"
                      aria-hidden="true"
                    />
                  )}
                </div>
                {entry.metrics && (
                  <dl className="impact-metrics">
                    {entry.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="experience-groups">
                  {entry.groups.map((group, index) => (
                    <div className="experience-group" key={group.title}>
                      {!entry.endDate && (
                        <span className="group-number" aria-hidden="true">
                          0{index + 1}
                        </span>
                      )}
                      <div>
                        <h4>{group.title}</h4>
                        {group.details.map((detail) => (
                          <p key={detail}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
