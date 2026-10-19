import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatRelativeTime,
  truncate,
  slugify,
  getLanguageColor,
  classNames,
} from '@/lib/utils';

describe('formatDate', () => {
  it('formats date correctly', () => {
    expect(formatDate('2024-01-15')).toBe('January 15, 2024');
    expect(formatDate('2023-12-25')).toBe('December 25, 2023');
  });

  it('handles Date objects', () => {
    expect(formatDate(new Date('2024-06-10'))).toBe('June 10, 2024');
  });
});

describe('formatRelativeTime', () => {
  const now = new Date('2024-01-15T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows minutes ago for recent dates', () => {
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
    expect(formatRelativeTime(fiveMinutesAgo)).toBe('5m ago');
  });

  it('shows hours ago for older dates', () => {
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(threeHoursAgo)).toBe('3h ago');
  });

  it('shows days ago for older dates', () => {
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(twoDaysAgo)).toBe('2d ago');
  });

  it('shows weeks ago for older dates', () => {
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(oneWeekAgo)).toBe('1w ago');
  });

  it('shows months ago for older dates', () => {
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(twoMonthsAgo)).toBe('2mo ago');
  });

  it('shows years ago for older dates', () => {
    const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(twoYearsAgo)).toBe('2y ago');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello World', 8)).toBe('Hello Wo...');
  });

  it('returns original string if shorter than length', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  it('handles exact length', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });
});

describe('slugify', () => {
  it('converts to lowercase and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello@World!')).toBe('helloworld');
  });

  it('handles multiple spaces and hyphens', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
    expect(slugify('Hello---World')).toBe('hello-world');
  });

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });
});

describe('getLanguageColor', () => {
  it('returns correct colors for known languages', () => {
    expect(getLanguageColor('TypeScript')).toBe('bg-blue-500');
    expect(getLanguageColor('JavaScript')).toBe('bg-yellow-500');
    expect(getLanguageColor('Python')).toBe('bg-green-500');
    expect(getLanguageColor('Rust')).toBe('bg-orange-500');
    expect(getLanguageColor('Go')).toBe('bg-cyan-500');
  });

  it('returns default color for unknown languages', () => {
    expect(getLanguageColor('UnknownLanguage')).toBe('bg-muted');
    expect(getLanguageColor(null)).toBe('bg-muted');
  });
});

describe('classNames', () => {
  it('joins class names', () => {
    expect(classNames('a', 'b', 'c')).toBe('a b c');
  });

  it('filters out falsy values', () => {
    expect(classNames('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('handles empty input', () => {
    expect(classNames()).toBe('');
  });
});