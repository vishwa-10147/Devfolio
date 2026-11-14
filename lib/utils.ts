import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRelativeTime(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffDays < 1) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes}m ago`;
    }
    return `${diffHours}h ago`;
  }
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getLanguageColor(language: string | null): string {
  if (!language) return 'bg-muted';
  
  const colors: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-500',
    Python: 'bg-green-500',
    Rust: 'bg-orange-500',
    Go: 'bg-cyan-500',
    Java: 'bg-red-500',
    'C++': 'bg-pink-500',
    C: 'bg-sky-500',
    'C#': 'bg-purple-500',
    Swift: 'bg-orange-400',
    Kotlin: 'bg-purple-600',
    Ruby: 'bg-red-600',
    PHP: 'bg-indigo-500',
    HTML: 'bg-orange-500',
    CSS: 'bg-sky-500',
    Shell: 'bg-green-400',
    Dockerfile: 'bg-blue-400',
    Vue: 'bg-green-600',
    Svelte: 'bg-orange-600',
    Astro: 'bg-purple-500',
    MDX: 'bg-gray-500',
  };

  return colors[language] || 'bg-muted';
}

/**
 * GitHub-style language colors, softened slightly for the dark theme.
 * Used for a small dot next to a neutral language label.
 */
const LANGUAGE_DOT_COLORS: Record<string, string> = {
  TypeScript: '#3b82c4',
  JavaScript: '#e5c84a',
  Python: '#4b8bbe',
  'Jupyter Notebook': '#e07b39',
  Rust: '#d08a5e',
  Go: '#4fb8d4',
  Java: '#c4884a',
  'C++': '#e0538a',
  C: '#7d8a99',
  'C#': '#3f9b5e',
  Swift: '#f07a5a',
  Kotlin: '#9b7fe0',
  Ruby: '#c9504c',
  PHP: '#7b84b8',
  HTML: '#e06c4a',
  CSS: '#8b6cc4',
  Shell: '#7fbf5a',
  Dockerfile: '#4b8bbe',
  Vue: '#4fb58a',
  Svelte: '#f06a3c',
  Astro: '#e0663c',
  MDX: '#e0a84a',
  ShaderLab: '#5a6f8c',
};

/** Hex color for a language's dot; a neutral grey for unknown languages. */
export function getLanguageDotColor(language: string | null): string {
  return (language && LANGUAGE_DOT_COLORS[language]) || '#8b949e';
}

/** When a repo was last modified: its last code push, falling back to its last update. */
export function lastModified(repo: { pushedAt: string | null; updatedAt: string }): number {
  return new Date(repo.pushedAt || repo.updatedAt).getTime();
}

/**
 * Pinned repos first, then everything else; each group newest change first.
 * `pinned` holds lowercase repository names.
 */
export function orderByPinnedThenModified<T extends { name: string; pushedAt: string | null; updatedAt: string }>(
  repos: T[],
  pinned: string[]
): T[] {
  return [...repos].sort((a, b) => {
    const pa = pinned.includes(a.name.toLowerCase()) ? 0 : 1;
    const pb = pinned.includes(b.name.toLowerCase()) ? 0 : 1;
    return pa - pb || lastModified(b) - lastModified(a);
  });
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}