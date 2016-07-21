const http = require('http');
const url = require('url');

const sendCowsay = require('./sendCowsay').sendCowsay;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('API Endpoints:\n/api/cowsay');
    return;
  }

  if (req.url.startsWith('/api/cowsay')) {
    if (req.method === 'GET') {
      const parsedUrl = url.parse(req.url, true);
      if (parsedUrl.query.text) {
        sendCowsay(res, parsedUrl.query.text);
      } else {
        sendCowsay(res, 'You must inclue a text query param');
      }
    }
  }
});

module.exports = server;
