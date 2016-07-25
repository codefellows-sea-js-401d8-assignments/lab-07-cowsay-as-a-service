'use strict';

const http = require('http');
const cowsay = require('cowsay');
const url = require('url');
const jsonPromise = require('./lib/json_promise');

module.exports = exports = http.createServer((req, res) =>{
  let parsed = url.parse(req.url, true);
  if(req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API Endpoints:\n/api/cowsay');
    res.end();
  } else if (req.method === 'GET' && req.url === '/cowsay' + parsed.search){
    if(parsed.query.text){
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: parsed.query.text}));
      res.end();
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
      res.end();
    }
  } else if(req.method === 'POST' && req.url === '/cowsay' + parsed.search) {
    jsonPromise(req)
    .then((json) =>{
      if(json.text){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: json.text}));
        res.end();
      } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'}));
        res.end();
      }
    });
  }
}).listen(3000, () => {
  console.log('Server On');
});
