import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Workaround for https://github.com/vercel/next.js/issues/85374
 *
 * With `output: 'export'`, Next.js >= 16 writes RSC prefetch payloads to
 * nested paths like:
 *     about/info/__next.about/info/__PAGE__.txt
 * while the client router requests the flattened, dot-separated name:
 *     about/info/__next.about.info.__PAGE__.txt
 *
 * The mismatch makes every Link prefetch 404 on static hosts (GitHub Pages).
 * This adapter renames the generated files to the paths the client expects.
 * Remove once the upstream fix ships in a Next.js release.
 */
const adapter = {
  name: 'fix-rsc-paths-85374',

  async onBuildComplete({ outputs }) {
    const staticFiles = outputs?.staticFiles ?? [];
    const renames = [];

    for (const file of staticFiles) {
      const target = flattenRscPath(file.filePath);
      if (target) {
        renames.push(fs.rename(file.filePath, target));
      }
    }

    await Promise.all(renames);
  },
};

function flattenRscPath(filePath) {
  const components = filePath.split(path.sep);
  const idx = components.findIndex((component) => component.startsWith('__next.'));

  if (idx < 0 || idx >= components.length - 1) {
    return null;
  }

  const flattened = components.slice(0, idx);
  flattened.push(components.slice(idx).join('.'));
  return flattened.join(path.sep);
}

export default adapter;
