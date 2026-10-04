import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { getMarkdownFiles, parseStory, sortStories, type Story } from '../posts';

const storiesDir = path.join(process.cwd(), 'src/app/blog/stories');

const makeStory = (title: string, date: string): Story => ({
  title,
  content: '',
  date,
  topic: '',
});

describe('parseStory', () => {
  it('derives the title from the file name, stripping .md and replacing underscores', () => {
    const story = parseStory(
      'Dance_-_My_Journey.md',
      '---\ndate: "20240718"\ntopic: Life\n---\n# Archeology\nBody text'
    );

    expect(story.title).toBe('Dance - My Journey');
    expect(story.date).toBe('20240718');
    expect(story.topic).toBe('Life');
    expect(story.content).toContain('# Archeology');
    expect(story.content).toContain('Body text');
  });

  it('defaults date and topic to empty strings when frontmatter is missing', () => {
    const story = parseStory('Note.md', 'Just some text');

    expect(story.title).toBe('Note');
    expect(story.date).toBe('');
    expect(story.topic).toBe('');
    expect(story.content).toContain('Just some text');
  });

  it('keeps the title unchanged when the file name has no extension marker to strip', () => {
    expect(parseStory('A_B_C.md', '').title).toBe('A B C');
  });
});

describe('sortStories', () => {
  it('sorts stories newest first', () => {
    const sorted = sortStories([
      makeStory('old', '20240101'),
      makeStory('newest', '20240718'),
      makeStory('middle', '20240401'),
    ]);

    expect(sorted.map((s) => s.title)).toEqual(['newest', 'middle', 'old']);
  });

  it('sorts empty dates to the end (treated as oldest)', () => {
    const sorted = sortStories([makeStory('undated', ''), makeStory('dated', '20240101')]);

    expect(sorted.map((s) => s.title)).toEqual(['dated', 'undated']);
  });

  it('does not mutate the input array', () => {
    const input = [makeStory('a', '20240101'), makeStory('b', '20240718')];
    sortStories(input);

    expect(input.map((s) => s.title)).toEqual(['a', 'b']);
  });
});

describe('getMarkdownFiles (integration with the real stories directory)', () => {
  it('loads every markdown file in src/app/blog/stories', () => {
    const expectedCount = fs.readdirSync(storiesDir).filter((f) => f.endsWith('.md')).length;
    const stories = getMarkdownFiles();

    expect(expectedCount).toBeGreaterThan(0);
    expect(stories).toHaveLength(expectedCount);
  });

  it('includes the Dance story under its Windows-safe renamed title', () => {
    const titles = getMarkdownFiles().map((s) => s.title);

    expect(titles).toContain('Dance - My Journey');
  });

  it('returns dated stories sorted newest first (when dates are present)', () => {
    const dated = getMarkdownFiles().filter((s) => s.date);

    for (let i = 1; i < dated.length; i++) {
      expect(String(dated[i - 1].date) >= String(dated[i].date)).toBe(true);
    }
  });

  it('every story has a title and content', () => {
    for (const story of getMarkdownFiles()) {
      expect(story.title.length).toBeGreaterThan(0);
      expect(story.content.length).toBeGreaterThan(0);
    }
  });
});
