import { profile } from '@/data/profile';
import { SectionHeading } from '@/components/ui/section-heading';

export function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="about-section section"
      aria-labelledby="about-title"
    >
      <div className="container about-grid">
        <div>
          <SectionHeading
            number="03"
            label="A little context"
            title="Software, from end to end."
            id="about-title"
          />
          <p className="about-signature">
            {profile.name}
            <span>Software Engineer · {profile.location}</span>
          </p>
        </div>
        <div className="about-copy">
          <p className="about-lead">{profile.aboutLead}</p>
          <p>{profile.summary}</p>
          <p>{profile.about}</p>
          <p>{profile.engineeringApproach}</p>
        </div>
      </div>
    </section>
  );
}
