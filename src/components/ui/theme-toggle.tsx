'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

type Theme = 'system' | 'light' | 'dark';
function readTheme(): Theme {
  const value = document.documentElement.dataset.theme;
  return value === 'light' || value === 'dark' ? value : 'system';
}
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    readTheme,
    () => 'system' as const,
  );
  const next: Theme =
    theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
  const Icon = theme === 'system' ? Monitor : theme === 'light' ? Sun : Moon;

  function changeTheme() {
    if (next === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = next;
    try {
      if (next === 'system') localStorage.removeItem('theme');
      else localStorage.setItem('theme', next);
    } catch {
      /* Theme remains functional without persistent storage. */
    }
  }

  return (
    <button
      type="button"
      className="action theme-toggle cursor-pointer"
      title={`Theme: ${theme}. Switch to ${next}`}
      aria-label={`Theme: ${theme}. Switch to ${next} theme`}
      onClick={changeTheme}
    >
      <Icon size={18} aria-hidden="true" />
      <span className="sr-only">Switch to {next} theme</span>
    </button>
  );
}
