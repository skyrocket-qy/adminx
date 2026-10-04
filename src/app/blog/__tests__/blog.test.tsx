import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogPageClient from '../BlogPageClient';
import type { Story } from '@/lib/posts';

const stories: Story[] = [
  {
    title: 'First_Story',
    content: '# Heading\n\nSome **bold** text',
    date: '20240101',
    topic: 'Tech',
  },
  { title: 'Second_Story', content: 'plain content', date: '20240102', topic: 'Life' },
  { title: 'Third_Story', content: 'third content', date: '20240103', topic: 'Tech' },
];

describe('BlogPageClient', () => {
  it('shows the welcome page by default', () => {
    render(<BlogPageClient stories={stories} />);

    expect(screen.getByText('Welcome to my playground!!')).toBeInTheDocument();
  });

  it('lists every story in the sidebar', () => {
    render(<BlogPageClient stories={stories} />);

    expect(screen.getByRole('heading', { level: 3, name: 'First_Story' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Second_Story' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Third_Story' })).toBeInTheDocument();
  });

  it('filters the sidebar by topic', async () => {
    const user = userEvent.setup();
    render(<BlogPageClient stories={stories} />);

    await user.selectOptions(screen.getByLabelText('Filter by Topic'), 'Life');

    expect(screen.getByRole('heading', { level: 3, name: 'Second_Story' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: 'First_Story' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3, name: 'Third_Story' })).not.toBeInTheDocument();
  });

  it('renders the selected story with markdown formatting', async () => {
    const user = userEvent.setup();
    render(<BlogPageClient stories={stories} />);

    await user.click(screen.getByRole('heading', { level: 3, name: 'First_Story' }));

    expect(screen.getByRole('heading', { level: 1, name: 'Heading' })).toBeInTheDocument();
    expect(screen.getByText('bold')).toBeInTheDocument();
  });

  it('truncates long story previews in the sidebar', () => {
    const longStory: Story = {
      title: 'Long_Story',
      content: 'x'.repeat(150),
      date: '20240104',
      topic: 'Tech',
    };
    render(<BlogPageClient stories={[longStory]} />);

    expect(screen.getByText(`${'x'.repeat(100)}...`)).toBeInTheDocument();
  });
});
