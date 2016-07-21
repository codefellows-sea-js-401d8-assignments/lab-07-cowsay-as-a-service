'use strict';

const http = require('http');
const cowsay = require('./cowsay');

http.createServer((req, res) => {
  if(req.method === 'GET') {
    res.write('get');
    res.end();
  }
  if(req.method === 'POST') {
    res.write('post');
    res.end();
  }
});
