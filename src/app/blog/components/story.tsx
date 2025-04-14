
import React from 'react';
import Markdown  from 'react-markdown';
import remarkGfm from 'remark-gfm'
import './story.css';
import { Story } from '@/lib/posts';

const BlogStory: React.FC<Story> = ({ title, content, date }) => {
  return (
    <div className=" h-full pl-4 pt-2 justify-center">
      <div className="font-bold text-7xl flex text-indigo-900 pb-4" >{title}</div>
      <p className="text-gray-900 font-medium flex pt-2 pb-2">{date}</p>
      <div className='markdown-body pt-4 '>
        <Markdown remarkPlugins={[[remarkGfm]]}>
          {content}
        </Markdown>
      </div>
    </div>
  );
};

export default BlogStory;
