import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  signIn: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
}));

vi.mock('../auth', () => ({
  signIn: mocks.signIn,
}));

import LoginForm from '../login-form';

async function submitCredentials(username: string, password: string) {
  const user = userEvent.setup();
  render(<LoginForm />);

  await user.type(screen.getByRole('textbox'), username);
  await user.type(document.querySelector('input[type="password"]') as HTMLInputElement, password);
  await user.click(screen.getByRole('button', { name: /log in/i }));
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the login fields', () => {
    render(<LoginForm />);

    expect(screen.getByText('Please log in to continue.')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(document.querySelector('input[type="password"]')).toBeInTheDocument();
  });

  it('stores the session and redirects on a successful login', async () => {
    mocks.signIn.mockResolvedValueOnce('fake-token');

    await submitCredentials('admin', 'secret');

    await waitFor(() => expect(mocks.signIn).toHaveBeenCalledWith('admin', 'secret'));
    await waitFor(() => expect(mocks.push).toHaveBeenCalledWith('/admin'));
    expect(localStorage.getItem('session')).toBe('fake-token');
  });

  it('shows an error message when the credentials are rejected', async () => {
    mocks.signIn.mockResolvedValueOnce(null);

    await submitCredentials('admin', 'wrong');

    expect(await screen.findByText('Invalid credentials.')).toBeInTheDocument();
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it('shows an error message when signIn throws', async () => {
    mocks.signIn.mockRejectedValueOnce(new Error('network down'));

    await submitCredentials('admin', 'secret');

    expect(await screen.findByText('An unexpected error occurred.')).toBeInTheDocument();
    expect(mocks.push).not.toHaveBeenCalled();
  });
});
