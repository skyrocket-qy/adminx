import { describe, expect, it } from 'vitest';
import {
  formatDateRange,
  formatResumeDate,
  getEntryKind,
  getResume,
  humanizeSectionTitle,
  parseResume,
  socialUrl,
} from '../resume';

describe('formatResumeDate', () => {
  it('formats a YYYY-MM date', () => {
    expect(formatResumeDate('2025-06')).toBe('Jun 2025');
    expect(formatResumeDate('2024-11')).toBe('Nov 2024');
  });

  it('passes through other formats and numbers', () => {
    expect(formatResumeDate('2020')).toBe('2020');
    expect(formatResumeDate('Fall 2023')).toBe('Fall 2023');
    expect(formatResumeDate(2024)).toBe('2024');
  });

  it('handles empty values', () => {
    expect(formatResumeDate(null)).toBe('');
    expect(formatResumeDate(undefined)).toBe('');
  });

  it('handles an out-of-range month defensively', () => {
    expect(formatResumeDate('2025-13')).toBe('13 2025');
  });
});

describe('formatDateRange', () => {
  it('uses a plain date when present', () => {
    expect(formatDateRange({ date: '2023-07' })).toBe('Jul 2023');
  });

  it('renders an explicit range', () => {
    expect(formatDateRange({ start_date: '2024-11', end_date: '2025-05' })).toBe(
      'Nov 2024 – May 2025'
    );
  });

  it('treats a missing end date as present', () => {
    expect(formatDateRange({ start_date: '2025-06' })).toBe('Jun 2025 – present');
  });

  it('returns an empty string when there are no dates', () => {
    expect(formatDateRange({ name: 'Undated project' })).toBe('');
  });
});

describe('humanizeSectionTitle', () => {
  it('capitalizes words and keeps minor words lowercase', () => {
    expect(humanizeSectionTitle('licenses_and_certifications')).toBe(
      'Licenses and Certifications'
    );
    expect(humanizeSectionTitle('experience')).toBe('Experience');
  });

  it('handles an empty key', () => {
    expect(humanizeSectionTitle('')).toBe('');
  });
});

describe('socialUrl', () => {
  it('builds URLs for known networks', () => {
    expect(socialUrl('LinkedIn', 'jimmy-huang-07aa4722a')).toBe(
      'https://www.linkedin.com/in/jimmy-huang-07aa4722a'
    );
    expect(socialUrl('GitHub', 'skyrocket-qy')).toBe('https://github.com/skyrocket-qy');
    expect(socialUrl('Leetcode', 'rivendinner')).toBe('https://leetcode.com/u/rivendinner');
    expect(socialUrl('Instagram', '@jimmy')).toBe('https://www.instagram.com/jimmy');
    expect(socialUrl('X', 'jimmy')).toBe('https://x.com/jimmy');
    expect(socialUrl('Medium', 'jimmy')).toBe('https://medium.com/@jimmy');
  });

  it('returns null for unknown networks', () => {
    expect(socialUrl('Mastodon', 'jimmy')).toBeNull();
  });
});

describe('getEntryKind', () => {
  it('detects each entry type', () => {
    expect(getEntryKind({ label: 'Languages', details: 'Go' })).toBe('one-line');
    expect(getEntryKind({ company: 'Fontech', position: 'Engineer' })).toBe('experience');
    expect(getEntryKind({ institution: 'CYCU', area: 'Math' })).toBe('education');
    expect(getEntryKind({ name: 'Vistrace' })).toBe('normal');
  });

  it('falls back to normal for partial fields', () => {
    expect(getEntryKind({ label: 'Languages' })).toBe('normal');
  });
});

describe('parseResume', () => {
  it('handles a YAML document without a cv key', () => {
    const resume = parseResume('design:\n  theme: classic\n');

    expect(resume.name).toBe('');
    expect(resume.sections).toEqual([]);
    expect(resume.socialNetworks).toEqual([]);
  });

  it('skips non-array and empty sections and non-object entries', () => {
    const resume = parseResume(`cv:
  name: Jane Doe
  sections:
    experience:
      - company: Acme
        position: Engineer
        start_date: 2024-01
    empty_section: []
    text_section:
      - plain string entry
    not_a_list: 42
`);

    expect(resume.sections).toHaveLength(1);
    expect(resume.sections[0].key).toBe('experience');
    expect(resume.sections[0].entries).toHaveLength(1);
  });

  it('normalizes list values and numeric fields', () => {
    const resume = parseResume(`cv:
  name: 42
  email:
    - first@example.com
    - second@example.com
  phone: "+123"
  social_networks:
    - network: GitHub
      username: jane
`);

    expect(resume.name).toBe('42');
    expect(resume.email).toBe('first@example.com');
    expect(resume.phone).toBe('+123');
    expect(resume.socialNetworks).toEqual([{ network: 'GitHub', username: 'jane' }]);
  });
});

describe('getResume (vendored resumer output)', () => {
  const resume = getResume();

  it('reads the CV header', () => {
    expect(resume.name).toBe('Jimmy Huang');
    expect(resume.headline).toContain('Backend');
    expect(resume.email).toBe('skyrocketqy81@gmail.com');
    expect(resume.website).toContain('adminx');
  });

  it('contains the expected sections in order', () => {
    expect(resume.sections.map((section) => section.key)).toEqual([
      'experience',
      'education',
      'projects',
      'licenses_and_certifications',
      'skills',
      'languages',
    ]);
  });

  it('includes experience and skill entries', () => {
    const experience = resume.sections.find((section) => section.key === 'experience');
    expect(experience?.entries.length).toBeGreaterThan(4);
    expect(experience?.entries.every((entry) => entry.company)).toBe(true);

    const skills = resume.sections.find((section) => section.key === 'skills');
    expect(skills?.entries.every((entry) => entry.label && entry.details)).toBe(true);
  });
});
