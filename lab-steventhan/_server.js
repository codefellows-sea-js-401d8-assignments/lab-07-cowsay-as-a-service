'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const jsonPromise = require('./lib/json_parser');

let server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    let parsed = url.parse(req.url, true);
    if(req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write('API Endpoints: /api/cowsay');
      res.end();
    } else if (req.url === '/api/cowsay' + parsed.search) {
      if (parsed.query.text) {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({text: parsed.query.text.split('-').join(' ')}));
        res.end();
      } else {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
      }
    }
  } else if (req.method === 'POST') {

    return jsonPromise(req)
      .then((parsedJSON) => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        if (parsedJSON.text) res.write(`{"cowsay": ${cowsay.say({text: parsedJSON.text})}}`);
        else res.write(`{"cowsay": ${cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})}}`);
        res.end();
      }, (err) => {
        console.log(err);
        res.writeHead(400, {
          'Content-Type': 'application/json'
        });
        res.write(`{"cowsay": ${cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})}}`);
        res.end();
      });
  }
});

module.exports = server;
