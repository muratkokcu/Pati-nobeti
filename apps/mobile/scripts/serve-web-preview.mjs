import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] ?? 'dist-preview');
const port = Number(process.argv[3] ?? 8081);
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'], ['.json', 'application/json; charset=utf-8'],
  ['.wasm', 'application/wasm'], ['.png', 'image/png'], ['.ico', 'image/x-icon'],
  ['.svg', 'image/svg+xml'], ['.woff2', 'font/woff2'],
]);

async function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidate = resolve(join(root, decoded || 'index.html'));
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;
  for (const path of [candidate, `${candidate}.html`, join(candidate, 'index.html')]) {
    try { if ((await stat(path)).isFile()) return path; } catch { /* Try the next route form. */ }
  }
  return join(root, 'index.html');
}

createServer(async (request, response) => {
  response.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  const file = await resolveFile(new URL(request.url ?? '/', 'http://localhost').pathname);
  if (!file) { response.writeHead(403).end('Forbidden'); return; }
  response.setHeader('Content-Type', mime.get(extname(file)) ?? 'application/octet-stream');
  createReadStream(file).on('error', () => response.writeHead(404).end('Not found')).pipe(response);
}).listen(port, '0.0.0.0', () => {
  process.stdout.write(`PatiNöbeti preview: http://localhost:${port}\n`);
});
