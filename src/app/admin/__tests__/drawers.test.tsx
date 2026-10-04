import type { ComponentType } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => ({
  createTuple: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
}));

vi.mock('@/services/connect/client', () => ({
  client: { createTuple: mocks.createTuple },
}));

vi.mock('react-toastify', () => ({
  toast: { success: mocks.success, error: mocks.error },
}));

vi.mock('@/components/ui/drawer', async () => {
  const React = await import('react');
  const Passthrough = ({ children }: { children?: React.ReactNode }) =>
    React.createElement('div', null, children);
  return {
    Drawer: Passthrough,
    DrawerTrigger: Passthrough,
    DrawerContent: Passthrough,
    DrawerHeader: Passthrough,
    DrawerTitle: Passthrough,
  };
});

import { CreateUserDrawer as ResourceDrawer } from '@/app/admin/rbac/resource/drawer';
import { CreateRoleDrawer } from '@/app/admin/rbac/role/drawer';
import { CreateUserDrawer as UserDrawer } from '@/app/admin/rbac/user/drawer';
import { CreateTupleDrawer } from '@/app/admin/tuple/drawer';

async function fillDrawerForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText('user'), 'user');
  await user.type(screen.getByPlaceholderText('alice'), 'alice');
  await user.type(screen.getByPlaceholderText('member'), 'member');
  await user.type(screen.getByPlaceholderText('role'), 'role');
  await user.type(screen.getByPlaceholderText('admin'), 'admin');
}

const drawers: Array<[string, ComponentType]> = [
  ['resource', ResourceDrawer],
  ['role', CreateRoleDrawer],
  ['user', UserDrawer],
  ['tuple', CreateTupleDrawer],
];

describe.each(drawers)('Create %s drawer', (_name, Drawer) => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createTuple.mockResolvedValue({});
  });

  it('blocks submission when fields are empty and shows validation messages', async () => {
    const user = userEvent.setup();
    render(<Drawer />);

    await user.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findAllByText('Subject id is required')).toHaveLength(2);
    expect(screen.getByText('Subject namespace is required')).toBeInTheDocument();
    expect(screen.getByText('Relation is required')).toBeInTheDocument();
    expect(screen.getByText('Object namespace is required')).toBeInTheDocument();
    expect(mocks.createTuple).not.toHaveBeenCalled();
  });

  it('maps form values to the RPC payload and toasts on success', async () => {
    const user = userEvent.setup();
    render(<Drawer />);

    await fillDrawerForm(user);
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() =>
      expect(mocks.createTuple).toHaveBeenCalledWith({
        sbjNs: 'user',
        sbjId: 'alice',
        rel: 'member',
        objNs: 'role',
        objId: 'admin',
      })
    );
    expect(mocks.success).toHaveBeenCalled();
  });

  it('shows an error toast when the RPC fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mocks.createTuple.mockRejectedValueOnce(new Error('rpc down'));
    const user = userEvent.setup();
    render(<Drawer />);

    await fillDrawerForm(user);
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => expect(mocks.error).toHaveBeenCalledWith('Failed to create tuple.'));
    errorSpy.mockRestore();
  });
});
