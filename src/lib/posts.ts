// src/lib/posts.ts
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

export interface Story {
  title: string;
  content: string;
  date: string;
  topic: string;
}

// Helper function to load .md files at build time
export function getMarkdownFiles(): Story[] {
  // const postsDirectory = path.join(process.cwd(), 'src/app/blog/stories');
  // const fileNames = fs.readdirSync(postsDirectory);

  // const allPostsData: Story[] = fileNames.map((fileName) => {
  //   const fullPath = path.join(postsDirectory, fileName);
  //   const fileContents = fs.readFileSync(fullPath, 'utf8');

  //   // Use gray-matter to parse markdown front-matter
  //   const { data, content } = matter(fileContents);

  //   return {
  //     title: fileName.replace(/\.md$/, '').replaceAll('_', ' '),
  //     content: content,
  //     date: data.date || '',
  //     topic: data.topic || '',
  //   };
  // });

  // allPostsData.sort((a, b) => {
  //   const toDate = (d: string) => new Date(+d.slice(0, 4), +d.slice(4, 6) - 1, +d.slice(6, 8));
  //   return toDate(b.date).getTime() - toDate(a.date).getTime();
  // });

  // return allPostsData;
  return [];
}
