export type PublicUrl = `https://${string}`;
export type LocalAsset = `/${string}`;

export interface Project {
  slug: string;
  title: string;
  category: string;
  context: 'personal' | 'professional';
  featured: boolean;
  description: string;
  technologies: readonly string[];
  implementation: readonly string[];
  outcomes: readonly string[];
  demoUrl?: PublicUrl;
  repositoryUrl?: PublicUrl;
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  groups: readonly { title: string; details: readonly string[] }[];
  metrics?: readonly { value: string; label: string }[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: readonly string[];
}
