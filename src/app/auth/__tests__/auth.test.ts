import { describe, expect, it, vi } from 'vitest';
import { signIn } from '../auth';

describe('signIn', () => {
  it('returns the (currently stubbed) session token', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    await expect(signIn('admin', 'secret')).resolves.toBe('fake-token');

    log.mockRestore();
  });
});
