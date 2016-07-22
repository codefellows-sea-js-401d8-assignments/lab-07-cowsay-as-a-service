'use strict';

const http = require('http');
const url = require('url');
const prom = require('./promise');
const cowsay = require('cowsay');

http.createServer((req, res) => {
  let parsed = url.parse(req.url, true);
  if (parsed.pathname === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write('Hello!\nNow try: localhost:3000/api/cowsay with a query string like ?text=mooo!\n');
    res.end();
  } else if (parsed.pathname === '/api/cowsay') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    if (req.method === 'GET') {
      if (!parsed.query || parsed.query == null || !parsed.query.text) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({
          text: 'bad request\n try: localhost:3000/api/cowsay?text=howdy'
        }) + '\n');
        res.end();
      } else {
        res.write(cowsay.say(parsed.query) + '\n');
        res.end();
      }
    } else if (req.method === 'POST') {
      if (!parsed.query || parsed.query == null || !parsed.query.text) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        prom(req,res);
      }
    } else if(req.method === 'PUT' || req.method === 'DELETE'){
      var meth = req.method;
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write('Bad request: nothing to ' + meth + '.\nPlease try a "GET" or a "POST" request.\n');
      res.end();
    }
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('Invalid pathname\n');
    res.end();
  }

}).listen(3000, () => console.log('server up on 3000'));
