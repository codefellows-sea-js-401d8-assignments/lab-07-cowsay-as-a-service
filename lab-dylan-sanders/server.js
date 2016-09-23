'use strict';

const jsonPromise = require('./lib/json_promise');
const http = require('http');
const cowsay = require('cowsay');
const url = require('url');

http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API Endpoints: \n /api/cowsay');
    res.end();
  }  
  if (req.method === 'GET' && req.url === '/api/cowsay' + parsedUrl.search) {
    if(parsedUrl.query.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: parsedUrl.query.text}));
      res.end();
    } 
    if (!parsedUrl.query.text) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    }
  } 
  if (req.method === 'POST' && req.url === '/api/cowsay') {
    jsonPromise(req).then((json) => {
      if (json.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: json.text}));
        res.end();
      } 
      if (!json.text) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
      } 
    }, (err) => {
      console.log('error ' + err);
      res.end();
    });
  }
}).listen(3000, () => console.log('server up on port 3000'));
