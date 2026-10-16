import type { Article } from '@/lib/types';

// Keep unpublished articles out of navigation, listings, and generated routes.
export const articles: readonly Article[] = [];
