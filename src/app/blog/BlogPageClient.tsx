// components/BlogPageClient.tsx
"use client";
import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import BlogStory from './components/story';
import { Story } from '@/lib/posts';

interface BlogPageClientProps {
  stories: Story[];
}

const BlogPageClient = ({ stories }: BlogPageClientProps) => {
  const [selectedPost, setSelectedPost] = useState<Story | null>(null);

  const mainpage: Story = {
    title: 'Welcome to my playground!!',
    date: '2024/7/12',
    topic: 'Mainpage',
    content:
      `
      This is a place where I write some stories about technology, personal... or lifestyle
      
      This is also a place I'll be experimenting with new technologies and learning about the world around me.
      `
  };

  const handleSelectPost = (title: string) => {
    const post = stories.find((story) => story.title === title);
    if (post) {
      setSelectedPost(post);
    }
  };

  return (
<div className="flex w-full h-full bg-violet-50 p-10">
  <div className="flex w-full h-full mx-auto gap-4">
    {/* Sidebar */}
    <div className="w-[18%] bg-white h-full rounded-2xl shadow-md overflow-y-auto">
      <Sidebar stories={stories} onSelectPost={handleSelectPost} />
    </div>

    {/* Content */}
    <div className="flex-1 h-full bg-white rounded-2xl shadow-md p-6 overflow-y-auto">
      {selectedPost ? (
        <BlogStory
          title={selectedPost.title}
          content={selectedPost.content}
          date={selectedPost.date}
          topic={selectedPost.topic}
        />
      ) : (
        <BlogStory
          title={mainpage.title}
          content={mainpage.content}
          date={mainpage.date}
          topic={mainpage.topic}
        />
      )}
    </div>
  </div>
</div>

  );
};

export default BlogPageClient;
