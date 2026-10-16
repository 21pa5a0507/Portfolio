'use client';

import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { navigation } from '@/data/navigation';
import { profile } from '@/data/profile';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function SiteHeader({ homePage = true }: { homePage?: boolean }) {
  const links = navigation.map((item) => ({
    ...item,
    href: homePage
      ? item.href
      : item.href === '#projects'
        ? '/projects'
        : `/${item.href}`,
  }));
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!homePage || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: '-96px 0px -60% 0px' },
    );
    document
      .querySelectorAll('main > section[id]')
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [homePage]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    function onBreakpoint(event: MediaQueryListEvent) {
      setOpen(false);
      const active = document.activeElement;
      const hiddenNav = headerRef.current?.querySelector(
        event.matches ? '#mobile-navigation' : '.desktop-nav',
      );
      if (
        hiddenNav?.contains(active) ||
        (event.matches && active === buttonRef.current)
      ) {
        const href =
          active instanceof HTMLAnchorElement
            ? active.getAttribute('href')
            : null;
        const desktopLinks = Array.from(
          headerRef.current?.querySelectorAll<HTMLAnchorElement>(
            '.desktop-nav a',
          ) ?? [],
        );
        const target = event.matches
          ? (desktopLinks.find((link) => link.getAttribute('href') === href) ??
            desktopLinks[0])
          : buttonRef.current;
        target?.focus({ preventScroll: true });
      }
    }
    desktop.addEventListener('change', onBreakpoint);
    return () => desktop.removeEventListener('change', onBreakpoint);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
    };
  }, [open]);

  function followAnchor(event: React.MouseEvent<HTMLAnchorElement>) {
    setOpen(false);
    const hash = event.currentTarget.hash;
    if (!homePage || !hash) return;
    setActiveSection(hash.slice(1));
    const target = document.querySelector<HTMLElement>(hash);
    target?.focus({ preventScroll: true });
  }

  return (
    <header
      className="site-header"
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setOpen(false);
      }}
    >
      <div className="container header-row">
        <a
          className="wordmark"
          href={homePage ? '#home' : '/#home'}
          aria-label={`${profile.name}, ${homePage ? 'back to top' : 'portfolio homepage'}`}
        >
          <span className="monogram" aria-hidden="true">
            k<span>.</span>
          </span>
          <span>
            {profile.name}
            <span className="wordmark-subtitle">Software Engineer</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={followAnchor}
              aria-current={
                (
                  homePage
                    ? activeSection === item.href.slice(1)
                    : item.label === 'Projects'
                )
                  ? 'location'
                  : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <ThemeToggle />
          <button
            ref={buttonRef}
            className="action menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav container"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={followAnchor}
            aria-current={
              (
                homePage
                  ? activeSection === item.href.slice(1)
                  : item.label === 'Projects'
              )
                ? 'location'
                : undefined
            }
          >
            {item.label}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  );
}
