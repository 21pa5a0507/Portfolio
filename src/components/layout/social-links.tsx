import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/profile';

export function SocialLinks() {
  const links = [
    { label: 'GitHub', href: profile.github },
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'Email', href: `mailto:${profile.email}` },
  ];
  return (
    <div className="social-links">
      {links.map((link) => (
        <a key={link.label} href={link.href}>
          {link.label}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
