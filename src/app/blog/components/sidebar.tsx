import { useState, useEffect } from 'react';
import { Story } from '@/lib/posts';
import './sidebar.css';

interface SidebarProps {
  stories: Story[];
  onSelectPost: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ stories, onSelectPost }) => {
  const [selectedType, setSelectedType] = useState('All');
  const [recommendedStory, setRecommendedStory] = useState<Story | null>(null);

  // Get unique story types
  const articleTypes = ['All', ...new Set(stories.map(story => story.topic))];

  // Filter stories by selected type
  const filteredStories = selectedType === 'All'
    ? stories
    : stories.filter(story => story.topic === selectedType);

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + '...';
  };

  // Function to select a random story for recommendation
  const getRandomStory = () => {
    const randomIndex = Math.floor(Math.random() * stories.length);
    return stories[randomIndex];
  };

  // Set a random recommended story on component mount
  useEffect(() => {
    setRecommendedStory(getRandomStory());
  }, [stories]);

  return (
    <div className=" bg-violet-50 h-full border-t-0 p-2 flex flex-col">
      <label htmlFor="typeFilter" className="block text-gray-700 text-sm p-1">
        Topic:
      </label>
      <select
        id="typeFilter"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="mb-2 p-1 h-10 border-2 rounded w-full bg-gray-200 custom-select items-center text-base"
      >
        {articleTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <ul className='leading-0 flex-grow'>
        {filteredStories.map((story) => (
          <button key={story.title} onClick={() => onSelectPost(story.title)} className="p-1 text-base block border-l pl-4 -ml-px border-transparent hover:border-slate-400 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
            <div className='flex items-center p-1 font-bold'>
              <div className="w-2.5 h-2.5 bg-violet-400 rounded-full mr-2"></div>
              <div>
                <div
                  className="text-slate-900 w-full h-2.5 hover:underline"
                >
                  {story.title}
                </div>
              </div>
            </div>
            <div className='flex p-1'>
              <div className="w-2.5 h-2.5 bg-violet-50 rounded-full mr-2"></div>
              <p className="text-sm text-left text-gray-900">
                {truncateContent(story.content, 60)} {/* Adjust the maxLength as needed */}
              </p>
            </div>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
