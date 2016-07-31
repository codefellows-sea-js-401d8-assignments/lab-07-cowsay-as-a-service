'use strict';
const http = require('http');
const promise = require('./lib/json_promise');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

http.createServer((req, res) => {
  let requestUrl = url.parse(req.url);

  if (req.url === '/') {
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.write(cowsay.say({text: 'you made a request to the server'}));
    res.end();
  }

  if (requestUrl.pathname === '/api/cowsay' && req.method === 'GET') {
    let textData = querystring.parse(requestUrl.query);
    if (textData.text) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let body = cowsay.say({text: textData.text});
      res.write(body);
      res.end();
    }
    if (!textData.text) {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      let body = cowsay.say({
        text: 'bad GET request\ntry: localhost:3000/cowsay?text=howdy'
      });
      res.write(body);
      res.end();
    }
  }

  if (req.url === '/api/cowsay' && req.method === 'POST') {
    promise(req).then((data) => {
      if (data.text) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let body = cowsay.say({text: data.text});
        res.write(body);
        res.end();
      }
      if (!data.text) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        let body = cowsay.say({
          text: 'bad POST request\ntry: localhost:3000/cowsay?text=howdy'
        });
        res.write(body);
        res.end();
      }
    }, (err) => {
      console.log(err);
      res.end();
    });
  }
}).listen(3000, console.log('server is up'));
