'use strict';

const http = require('http');
const cowsay = require('./cowsay');
const cowsayPromise = require('./promise.js');
const url = require('url');

const server = http.createServer((req, res) => {

  let parsed = url.parse(req.url, true);

  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
      'Content-Type':'text/plain'
    });
    res.write('API Endpoints:\n/api/cowsay');
    res.end();
  }

  if(req.method === 'GET' && req.url === '/api/cowsay' + parsed.search) {
    if (parsed.query.text) {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay(parsed.query.text.split('-').join(' ')));
      res.end();
    } else {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay('bad request\ntry: localhost:3000/cowsay?text=howdy'));
    }
  }

  if(req.method === 'POST' && req.url === '/') {
    cowsayPromise(req)
      .then((message) => {
        if (message.text) {
          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.write(cowsay(message.text));
          res.end();
        } else{
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.write(cowsay('bad request\ntry: localhost:3000/cowsay?text=howdy'));
        }
      });
  }
});

module.exports = server;
