'use server';
import fs from 'fs/promises';
import path from 'path';

export interface Story {
  title: string;
  content: string;
  date: string;
  topic: string;
}

export async function getMarkdownFiles(): Promise<Story[]> {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/stories');
  const fileNames = await fs.readdir(postsDirectory);

  const allPostsData: Story[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, 'utf8');

      const lines = fileContents.split('\n');
      const date = lines[0] || '';
      const topic = lines[1] || '';
      const content = lines.slice(2).join('\n');

      return {
        title: fileName.replace(/\.md$/, '').replaceAll('_', ' '),
        content,
        date,
        topic,
      };
    })
  );

  allPostsData.sort((a, b) => {
    const toDate = (d: string) => new Date(+d.slice(0,4), +d.slice(4,6)-1, +d.slice(6,8));
    return toDate(b.date).getTime() - toDate(a.date).getTime();
  });

  return allPostsData;
}
