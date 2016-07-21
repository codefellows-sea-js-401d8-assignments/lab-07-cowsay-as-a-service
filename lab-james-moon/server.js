'use strict';
const http = require('http');
const jsonPromise = require('./lib/json_promise.js');
const cowsay = require('cowsay');

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    jsonPromise(req).then((json) => {
      console.log('called back');
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(json.toString());
      res.end();
    }).catch((err) => {
      console.log(err);
    });
  }

}).listen(3000, () => console.log('server up'));

  // if (req.method === 'GET' && req.url === '/') {
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain'
  //   });
  //   res.write('whoa');
  //   res.end();
  // }
  //
  // if (req.method === 'POST' && req.url === '/') {
  //   let body = '';
  //   req.on('data', (data) => {
  //     body += data;
  //     let jsonBody = JSON.parse(body);
  //     if (jsonBody === )
  //     res.end();
  //   });
  // }
