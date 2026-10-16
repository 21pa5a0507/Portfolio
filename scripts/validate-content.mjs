import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.ts';
import { validateProjectContent } from '../src/lib/content-validation.ts';

const directory = new URL('../src/content/projects/', import.meta.url);
const files = readdirSync(directory)
  .filter((name) => name.endsWith('.mdx'))
  .map((filename) => ({
    filename,
    source: readFileSync(fileURLToPath(new URL(filename, directory)), 'utf8'),
  }));
validateProjectContent(projects, files);
console.log(
  `Validated ${projects.length} project metadata entries and matching MDX files.`,
);
