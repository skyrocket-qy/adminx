import { useState } from 'react';
import { Story } from '@/lib/posts';
import './sidebar.css';

interface SidebarProps {
  stories: Story[];
  onSelectPost: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ stories, onSelectPost }) => {
  const [selectedType, setSelectedType] = useState('All');
  const articleTypes = ['All', ...new Set(stories.map((story) => story.topic))];

  const filteredStories =
    selectedType === 'All'
      ? stories
      : stories.filter((story) => story.topic === selectedType);

  const truncateContent = (content: string, maxLength: number) => {
    return content.length <= maxLength
      ? content
      : content.substring(0, maxLength) + '...';
  };

  return (
    <div className="h-full p-4 flex flex-col bg-white rounded-2xl shadow-inner">
      <label htmlFor="typeFilter" className="text-sm text-gray-600 mb-2 font-medium">
        Filter by Topic
      </label>
      <select
        id="typeFilter"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        {articleTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <ul className="flex-grow space-y-3 overflow-y-auto pr-1">
        {filteredStories.map((story) => (
          <li key={story.title}>
            <button
              onClick={() => onSelectPost(story.title)}
              className="w-full text-left p-3 rounded-lg hover:bg-violet-100 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-violet-400 rounded-full" />
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                  {story.title}
                </h3>
              </div>
              <p className="text-xs text-gray-600 mt-1 pl-5 line-clamp-2">
                {truncateContent(story.content, 100)}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
