// src/lib/resume.ts
//
// The YAML next to this module is vendored from the `resumer` repo via its
// `make sync-adminx` target (which also copies the rendered PDF into
// `public/resume/`). Do not edit it here — update the CV in resumer instead.
import 'server-only';
import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

export interface SocialNetwork {
  network: string;
  username: string;
}

export interface ResumeEntry {
  // ExperienceEntry
  company?: string;
  position?: string;
  // EducationEntry
  institution?: string;
  area?: string;
  degree?: string;
  // NormalEntry / certifications / languages
  name?: string;
  // OneLineEntry
  label?: string;
  details?: string;
  // Shared fields
  summary?: string;
  location?: string | null;
  date?: string | number | null;
  start_date?: string | number | null;
  end_date?: string | number | null;
  highlights?: string[];
}

export interface ResumeSection {
  key: string;
  title: string;
  entries: ResumeEntry[];
}

export interface Resume {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  socialNetworks: SocialNetwork[];
  sections: ResumeSection[];
}

export type ResumeEntryKind = 'experience' | 'education' | 'one-line' | 'normal';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MINOR_WORDS = new Set(['and', 'or', 'of', 'to', 'the']);

/** Formats `2025-06` as `Jun 2025`; other values are returned as-is. */
export function formatResumeDate(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }
  const text = String(value).trim();
  const match = /^(\d{4})-(\d{2})$/.exec(text);
  if (match) {
    const month = Number(match[2]);
    return `${MONTHS[month - 1] ?? match[2]} ${match[1]}`;
  }
  return text;
}

/** `Jun 2025 – present`, `Jun 2025 – May 2026`, or a plain date when given. */
export function formatDateRange(entry: ResumeEntry): string {
  if (entry.date) {
    return formatResumeDate(entry.date);
  }
  const start = formatResumeDate(entry.start_date);
  if (!start) {
    return '';
  }
  if (entry.end_date) {
    return `${start} – ${formatResumeDate(entry.end_date)}`;
  }
  return `${start} – present`;
}

/** `licenses_and_certifications` -> `Licenses and Certifications`. */
export function humanizeSectionTitle(key: string): string {
  const words = key.replace(/_/g, ' ').split(/\s+/).filter(Boolean);
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && MINOR_WORDS.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

/** Best-effort profile URL for a RenderCV social network entry. */
export function socialUrl(network: string, username: string): string | null {
  const clean = username.replace(/^@/, '');
  switch (network.toLowerCase()) {
    case 'linkedin':
      return `https://www.linkedin.com/in/${clean}`;
    case 'github':
      return `https://github.com/${clean}`;
    case 'leetcode':
      return `https://leetcode.com/u/${clean}`;
    case 'instagram':
      return `https://www.instagram.com/${clean}`;
    case 'x':
    case 'twitter':
      return `https://x.com/${clean}`;
    case 'medium':
      return `https://medium.com/@${clean}`;
    default:
      return null;
  }
}

/** Detects which RenderCV entry type an entry is closest to. */
export function getEntryKind(entry: ResumeEntry): ResumeEntryKind {
  if (entry.label && entry.details) {
    return 'one-line';
  }
  if (entry.company || entry.position) {
    return 'experience';
  }
  if (entry.institution || entry.area) {
    return 'education';
  }
  return 'normal';
}

/** Parses a RenderCV YAML document into the shape used by the page. */
export function parseResume(yamlText: string): Resume {
  const parsed = parse(yamlText) as { cv?: Record<string, unknown> } | null;
  const cv = (parsed?.cv ?? {}) as Record<string, unknown>;
  const rawSections = (cv.sections ?? {}) as Record<string, unknown>;

  const sections: ResumeSection[] = Object.entries(rawSections)
    .filter(([, entries]) => Array.isArray(entries))
    .map(([key, entries]) => ({
      key,
      title: humanizeSectionTitle(key),
      entries: (entries as ResumeEntry[]).filter(
        (entry) => entry !== null && typeof entry === 'object'
      ),
    }))
    .filter((section) => section.entries.length > 0);

  return {
    name: asText(cv.name),
    headline: asText(cv.headline),
    location: asText(cv.location),
    email: asFirstText(cv.email),
    phone: asFirstText(cv.phone),
    website: asFirstText(cv.website),
    socialNetworks: Array.isArray(cv.social_networks)
      ? (cv.social_networks as SocialNetwork[])
      : [],
    sections,
  };
}

/** Build-time reader for the vendored `resume.yaml`. */
export function getResume(): Resume {
  const file = path.join(process.cwd(), 'src/app/about/info/resume.yaml');
  return parseResume(fs.readFileSync(file, 'utf8'));
}

function asText(value: unknown): string {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

function asFirstText(value: unknown): string {
  return Array.isArray(value) ? asText(value[0]) : asText(value);
}
