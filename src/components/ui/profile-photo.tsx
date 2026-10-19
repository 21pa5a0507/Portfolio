import Image from 'next/image';
import type { ProfilePhotoConfig } from '@/lib/types';

/** Optional local portrait. No wrapper or image request until a real asset is configured. */
export function ProfilePhoto({
  photo,
  className,
}: {
  photo?: ProfilePhotoConfig;
  className?: string;
}) {
  if (!photo) return null;
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      sizes="(max-width: 360px) calc(100vw - 40px), 320px"
      className={`profile-photo${className ? ` ${className}` : ''}`}
    />
  );
}
