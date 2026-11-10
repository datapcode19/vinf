const http = require('node:http'),
  fs = require('node:fs'),
  path = require('node:path');
exports.start = async (mount = '') => {
  const root = path.resolve(__dirname, '..');
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.ttf': 'font/ttf',
  };
  const server = http.createServer((req, res) => {
    let file;
    try {
      const url = new URL(req.url, 'http://localhost');
      if (mount && !url.pathname.startsWith(mount + '/')) {
        res.writeHead(404).end();
        return;
      }
      const pathname = url.pathname.slice(mount.length);
      file = path.resolve(
        root,
        '.' + decodeURIComponent(pathname === '/' ? '/index.html' : pathname),
      );
    } catch {
      res.writeHead(400).end();
      return;
    }
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (error, data) => {
      if (error) {
        res.writeHead(404).end();
        return;
      }
      res
        .writeHead(200, {
          'Content-Type':
            types[path.extname(file)] || 'application/octet-stream',
        })
        .end(data);
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return {
    base: 'http://127.0.0.1:' + server.address().port,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
};
