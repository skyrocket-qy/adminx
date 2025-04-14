"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar';
import BlogStory from './components/story';
import './scroll.css';
import { getMarkdownFiles, Story } from '@/lib/posts';


const mainpage: Story = {
  title: 'Welcome to my playground!!',
  date: '2024/7/12',
  topic: 'Mainpage',
  content: 
  `
  This is a place where I write some stories about technology, personal... or lifestyle
  
  This is also a place I'll be experimenting with new technologies and learning about the world around me.
  `
}

const BlogPage = () => {
  const [stories, setArticles] = useState<Story[]>([]);
  const [selectedPost, setSelectedPost] = useState<Story | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const loadedArticles = await getMarkdownFiles();
      setArticles(loadedArticles);
    };

    fetchArticles();
  }, []);

  const handleSelectPost = (title: string) => {
    const post = stories.find((story) => story.title === title);
    if (post) {
      setSelectedPost(post);
    }
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex h-full w-full">
        <div className=" w-1/4 h-full overflow-y-auto bg-violet-50"> 
          <Sidebar stories={stories} onSelectPost={handleSelectPost} />
        </div>
        <div className="p-4 w-full bg-yellow-50 overflow-y-auto">
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

export default BlogPage;
