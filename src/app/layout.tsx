import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { profile } from '@/data/profile';
import { themeInitScript } from '@/lib/theme';
import '@/styles/globals.css';
import '@/styles/home.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});
const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  icons: { icon: '/favicon.svg' },
  robots: { index: false, follow: false }, // Foundation preview; enable when full portfolio is ready.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${sans.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
