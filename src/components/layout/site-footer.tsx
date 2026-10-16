import { ArrowUp } from 'lucide-react';
import { profile } from '@/data/profile';

export function SiteFooter({ homePage = true }: { homePage?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <p>
          © {new Date().getUTCFullYear()} {profile.name}
        </p>
        <span className="footer-note">Built with care. Made to last.</span>
        <a href={homePage ? '#home' : '#main'}>
          Back to top
          <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
