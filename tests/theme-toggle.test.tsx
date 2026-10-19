import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createElement } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.theme;
  localStorage.clear();
  vi.restoreAllMocks();
});

it('keeps the theme control operable when persistent storage is unavailable', async () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Storage unavailable');
  });
  vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
    throw new Error('Storage unavailable');
  });
  const user = userEvent.setup();
  render(createElement(ThemeToggle));
  await user.click(
    screen.getByRole('button', {
      name: 'Theme: system. Switch to light theme',
    }),
  );
  await waitFor(() =>
    expect(document.documentElement.dataset.theme).toBe('light'),
  );
  await user.click(
    screen.getByRole('button', { name: 'Theme: light. Switch to dark theme' }),
  );
  await waitFor(() =>
    expect(document.documentElement.dataset.theme).toBe('dark'),
  );
  await user.click(
    screen.getByRole('button', { name: 'Theme: dark. Switch to system theme' }),
  );
  await waitFor(() =>
    expect(document.documentElement.dataset.theme).toBeUndefined(),
  );
  expect(
    screen.getByRole('button', {
      name: 'Theme: system. Switch to light theme',
    }),
  ).toBeVisible();
});
