'use strict';
const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const jsonPromise = require(__dirname + '/lib/json_promise');
const cowsay = require('cowsay');

const port = 3000;

http.createServer(function(req, res) {
  console.log(parseUrl(req.url));

  req.url = parseUrl(req.url); // returns url object with relevant fields
  req.url.query = parseQuery(req.url.query); // returns a query object with key values
  if(['POST', 'PUT', 'DELETE'].indexOf(req.method) > -1) {
    jsonPromise(req).then(() => { //success case

    });
  }

  if(req.url.pathname === '/'){ // writes root message
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API endpoints:\n  /api/cowsay');
    res.end();
  }
  //
  // if (req.method === 'GET') {
  //   res.write('get');
  //   res.end();
  // }
  // if (req.method === 'POST') {
  //   res.write('post');
  //   res.end();
  // }

}).listen(port, console.log('server running on ' + port));
