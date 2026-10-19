import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { ActionLink } from '@/components/ui/action-link';
import { EngineeringDrawing } from '@/components/ui/engineering-drawing';
import { SocialLinks } from '@/components/layout/social-links';
import { ExternalLink } from '@/components/ui/external-link';

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
          {profile.descriptor}
        </p>
        <h1 id="hero-title">
          Engineering AI-powered applications for{' '}
          <span className="hero-emphasis">
            <span className="hero-term">real-world</span> problems.
          </span>
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
            <ExternalLink href={profile.resumeUrl} className="action">
              View Resume
            </ExternalLink>
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
        <span>Agentic AI / Backend / Full-stack</span>
      </div>
    </section>
  );
}
