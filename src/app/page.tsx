import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Education, Achievements } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
