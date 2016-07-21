'use strict';
const http = require('http');
const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const parseBody = require(__dirname + '/lib/json_promise');
const cowsay = require('cowsay');

var server = module.exports = http.createServer((req, res) => {
  req.url = parseUrl(req.url); // returns url object with relevant fields

  // echo the endpoint
  if(req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API endpoints:\n  /api/cowsay');
    res.end();
    return;
  }

  if(req.url.pathname === '/api/cowsay/list') {
    cowsay.list((err, cows) => {
      respond(res, 200, {'Content-Type': 'text/plain'}, cows.join(', ') , false);
    });
  }

  if(req.url.pathname === '/api/cowsay') {
    if(req.method === 'GET') {
      try {
        req.url.query = parseQuery(req.url.query); // returns a query object with key values
        if(!req.url.query.text) throw Error();
        respond(res, 200, {'Content-Type': 'text/plain'}, req.url.query.text, true, req.url.query.type);

      } catch(err) {
        respond(res, 400, {'Content-Type': 'text/plain'}, 'bad request\ntry: localhost:8000/api/cowsay?text=howdy', true);
      }
    } else if(req.method === 'POST') {
      parseBody(req).then(() => {
        respond(res, 200, {'Content-Type': 'text/plain'}, req.body.text, true, req.body.type);
      }).catch((err) => {
        console.log(err);
        respond(res, 400, {'Content-Type': 'text/plain'}, 'bad request\ntry: localhost:8000/api/cowsay?text=howdy', true);
      });
    } else {
      respond(res, 400, {'Content-Type': 'text/plain'}, 'ERR: Unsupported request method\nPlease try GET or POST', true);
    }
  }
});

function respond(res, statusCode, contentType, response, cowsayOrNot, cowType) {
  res.writeHead(statusCode, contentType);
  if(cowsayOrNot) {
    let type = cowType || 'default';
    res.write(cowsay.say({text: response, f: type}));
  } else {
    res.write(response);
  }
  res.end();
}
