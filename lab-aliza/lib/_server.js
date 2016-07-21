'use strict';

const http = require('http');
const cowsay = require('./cowsay');
const cowsayPromise = require('./promise.js');

const server = http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/') {
    res.write('get');
    res.end();
  }

  if(req.method === 'POST' && req.url === '/') {
    cowsayPromise(req)
      .then((message) => {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay(message.text));
        res.end();
      });
  }
});

module.exports = server;
