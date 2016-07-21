'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');

let server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true)
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write('API Endpoints:\n/api/cowsay');
    res.end();
  } else if (urlObj.pathname === '/api/cowsay' && req.method === 'GET') {
    if (urlObj.query.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({
        text: urlObj.query.text
      }))
      res.end();
    } else {
      res.writeHead(400, {'Content-Type':'text/plain'});
      res.write(cowsay.say({
        text: 'bad request\ntry localhost:3000/api/cowsay?text=howdy'
      }))
      res.end();
    }
  } else if (urlObj.pathname === '/api/cowsay' && req.method === 'POST') {
    if (urlObj.query.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({
        text: urlObj.query.text
      }));
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({
        text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'
      }));
      res.end();
    }
  }
}).listen(3000, () => {
  console.log('Server on port 3000')
});

module.exports = server;
