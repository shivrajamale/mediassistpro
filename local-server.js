const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  let filePath = urlPath === "/" ? "/index.html" : urlPath;
  const absolutePath = path.join(__dirname, filePath);

  const ext = path.extname(absolutePath);
  const contentType = mimeTypes[ext] || "text/plain";

  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Local server running at http://localhost:${PORT}`);
  const startCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  require("child_process").exec(`${startCommand} http://localhost:${PORT}`);
});
