'use strict';
const http = require('http');
const promise = require('./lib/json_promise');
const querystring = require('querystring');
const cowsay = require('cowsay');

http.createServer((req, res) => {

  if (req.url === '/') {
    promise(req).then((result) => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(JSON.stringify(result));
      res.end();
    }, (err) => {
      console.log(err);
      res.end();
    });
  }

  if (req.url === '/cowsay') {
    promise(req).then((result) => {
      if (querystring.stringify(result)) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let body = cowsay.say({text: result.text});
        res.write(body);
        res.end();

      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        let body = cowsay.say({
          text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'
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
