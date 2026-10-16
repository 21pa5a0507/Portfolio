import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { ActionLink } from '@/components/ui/action-link';
import { EngineeringDrawing } from '@/components/ui/engineering-drawing';
import { SocialLinks } from '@/components/layout/social-links';

export function Hero() {
  return (
    <section
      id="home"
      tabIndex={-1}
      className="hero container"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="eyebrow hero-kicker">
          <span className="accent-rule" />
          Software Engineer / India
        </p>
        <h1 id="hero-title">
          Building reliable software and{' '}
          <span className="hero-emphasis">intelligent systems.</span>
        </h1>
        <p className="hero-intro">{profile.introduction}</p>
        <div className="hero-actions">
          <ActionLink href="#experience" primary>
            Explore experience
            <ArrowDown size={16} aria-hidden="true" />
          </ActionLink>
          <ActionLink href="#projects">
            View projects
            <ArrowUpRight size={16} aria-hidden="true" />
          </ActionLink>
          {profile.resumeUrl && (
            <ActionLink href={profile.resumeUrl}>Download résumé</ActionLink>
          )}
        </div>
        <SocialLinks />
      </div>
      <figure className="hero-figure">
        <div className="figure-label">
          <span>FIG. 01</span>
          <span>ENGINEERING, CONNECTED</span>
        </div>
        <EngineeringDrawing />
        <figcaption>
          From production foundations to practical intelligence.
        </figcaption>
      </figure>
      <div className="hero-footnote">
        <span>
          Currently building at{' '}
          <a href="#experience">
            Hexnode <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </span>
        <span>Backend / Full-stack / Agentic AI</span>
      </div>
    </section>
  );
}
