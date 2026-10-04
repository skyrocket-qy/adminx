import type { ColumnDef } from '@tanstack/react-table';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => ({
  deleteUser: vi.fn(),
  success: vi.fn(),
  error: vi.fn(),
}));

vi.mock('@/services/connect/rbac/client', () => ({
  client: { deleteUser: mocks.deleteUser },
}));

vi.mock('react-toastify', () => ({
  toast: { success: mocks.success, error: mocks.error },
}));

vi.mock('../drawer', async () => {
  const React = await import('react');
  return { CreateUserDrawer: () => React.createElement('div', null, 'create-drawer') };
});

import { DataTable } from '../data-table';

interface Row {
  name: string;
  role: string;
}

const columns: ColumnDef<Row>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        aria-label="select-all"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        aria-label={`select-${row.id}`}
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
];

const data: Row[] = [
  { name: 'alice', role: 'admin' },
  { name: 'bob', role: 'viewer' },
];

describe('DataTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.deleteUser.mockResolvedValue({});
  });

  it('renders rows passed as props', () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText('alice')).toBeInTheDocument();
    expect(screen.getByText('bob')).toBeInTheDocument();
    expect(screen.getByText(/total: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Page 1 of 1/)).toBeInTheDocument();
  });

  it('shows an empty state when there are no rows', () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('enables delete only after a row is selected and calls the RPC on click', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);

    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    expect(deleteButton).toBeDisabled();

    await user.click(screen.getByLabelText('select-0'));

    expect(deleteButton).toBeEnabled();
    await user.click(deleteButton);

    await waitFor(() => expect(mocks.deleteUser).toHaveBeenCalled());
    expect(mocks.success).toHaveBeenCalledWith('User delete successfully!');
  });

  it('reports a toast when deleting fails', async () => {
    mocks.deleteUser.mockRejectedValueOnce(new Error('rpc down'));
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} />);

    await user.click(screen.getByLabelText('select-0'));
    await user.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => expect(mocks.error).toHaveBeenCalledWith('Failed to delelte tuple.'));
  });

  it('parses the query input after a debounce and logs invalid syntax', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.useFakeTimers();

    render(<DataTable columns={columns} data={data} />);

    fireEvent.change(screen.getByPlaceholderText('SbjNs = 123 & Relation = member'), {
      target: { value: 'a = 1 & b = 2 | c = 3' },
    });

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
    vi.useRealTimers();
  });

  it('accepts a valid query without logging errors', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.useFakeTimers();

    render(<DataTable columns={columns} data={data} />);

    fireEvent.change(screen.getByPlaceholderText('SbjNs = 123 & Relation = member'), {
      target: { value: 'SbjNs = 123 & Relation = member' },
    });

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
    vi.useRealTimers();
  });
});
