import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Hero } from '@/components/sections/hero';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Education, Achievements } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';
import type { Metadata } from 'next';
import { profile } from '@/data/profile';
import { canonicalUrl, socialImages } from '@/lib/site';
import { personData } from '@/lib/structured-data';
import { StructuredData } from '@/components/ui/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl('/') },
  openGraph: {
    title: profile.seoTitle,
    description: profile.seoDescription,
    type: 'website',
    url: canonicalUrl('/'),
    images: socialImages(),
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.seoTitle,
    description: profile.seoDescription,
    images: socialImages(),
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <StructuredData data={personData()} />
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
