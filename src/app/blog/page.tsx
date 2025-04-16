// app/blog/page.tsx (Server Component)
import { getMarkdownFiles, Story } from '@/lib/posts';
import BlogPageClient from './BlogPageClient';

// This file runs on the server at build time
export default function BlogPage() {
  // Because this is a server component,
  // we can safely use Node.js APIs.
  const stories: Story[] = getMarkdownFiles();

  return <BlogPageClient stories={stories} />;
}
