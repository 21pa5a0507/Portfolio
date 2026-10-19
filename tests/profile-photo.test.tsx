import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ProfilePhoto } from '@/components/ui/profile-photo';

it('renders no image or reserved placeholder when a portrait has not been supplied', () => {
  const { container } = render(createElement(ProfilePhoto));
  expect(container).toBeEmptyDOMElement();
});

it('reserves image dimensions and provides an optimized responsive local portrait when configured', () => {
  render(
    createElement(ProfilePhoto, {
      photo: {
        src: '/images/kishore-kattiri.webp',
        alt: 'Portrait of Kishore Kattiri',
        width: 800,
        height: 800,
      },
    }),
  );
  const image = screen.getByRole('img', {
    name: 'Portrait of Kishore Kattiri',
  });
  expect(image).toHaveAttribute('width', '800');
  expect(image).toHaveAttribute('height', '800');
  expect(image).toHaveAttribute('srcset');
  expect(image.getAttribute('src')).toContain('/_next/image?');
});
