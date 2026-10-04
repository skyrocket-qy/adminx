import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const styleStub = fileURLToPath(new URL('./src/test/style-stub.ts', import.meta.url));

/**
 * Unit tests don't need the app's CSS pipeline (and Vite 8 cannot load the
 * string-form "@tailwindcss/postcss" plugin used by Next). Resolve every CSS
 * import to an empty module instead.
 */
const cssStubPlugin = {
  name: 'css-stub',
  enforce: 'pre' as const,
  resolveId(source: string) {
    if (source.endsWith('.css')) {
      return styleStub;
    }
    return null;
  },
};

export default defineConfig({
  plugins: [cssStubPlugin, react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules/**', 'e2e/**', 'docs/**', 'out/**', '.next/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/lib/utils.ts',
        'src/lib/posts.ts',
        'src/lib/ast.ts',
        'src/lib/schemas.ts',
        'src/app/auth/auth.ts',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 85,
        statements: 100,
      },
    },
  },
});
