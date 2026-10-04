// Minimal static server that mimics GitHub Pages resolution:
//   /about        -> about.html
//   /blog/        -> blog/index.html
//   missing       -> 404.html with status 404
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.cwd(), 'out');
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function findFile(pathname) {
  const decoded = decodeURIComponent(pathname.split('?')[0]);
  const safe = normalize(decoded).replace(/^[/\\]+/, '');
  const base = join(root, safe);
  if (!base.startsWith(root)) {
    return null;
  }

  const candidates = decoded.endsWith('/')
    ? [join(base, 'index.html')]
    : [base, `${base}.html`, join(base, 'index.html')];

  for (const candidate of candidates) {
    if (await isFile(candidate)) {
      return candidate;
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const file = await findFile(req.url ?? '/');

  if (!file) {
    try {
      const body = await readFile(join(root, '404.html'));
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Not found');
    }
    return;
  }

  const body = await readFile(file);
  res.writeHead(200, {
    'content-type': contentTypes[extname(file).toLowerCase()] ?? 'application/octet-stream',
  });
  res.end(body);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`static server serving ${root} on http://127.0.0.1:${port}`);
});
