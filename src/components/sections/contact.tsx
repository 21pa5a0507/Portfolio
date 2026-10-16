import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { SocialLinks } from '@/components/layout/social-links';

export function Contact() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="contact-section section"
      aria-labelledby="contact-title"
    >
      <div className="container contact-grid">
        <div>
          <p className="eyebrow mb-6">07 / Get in touch</p>
          <h2 id="contact-title">
            Good software starts
            <br />
            with a conversation.
          </h2>
          <p className="contact-intro">
            Let’s talk about backend systems, enterprise products, or practical
            AI applications.
          </p>
          <SocialLinks />
        </div>
        <div className="contact-details">
          <a className="contact-email" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
          <a
            className="contact-phone"
            href={`tel:${profile.phone.replace(/\s/g, '')}`}
          >
            {profile.phone}
          </a>
          <p className="eyebrow">Based in {profile.location}</p>
        </div>
      </div>
    </section>
  );
}
