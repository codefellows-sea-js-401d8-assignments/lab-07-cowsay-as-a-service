'use strict';

const http = require('http');
const url = require('url');

const cowsay = require('cowsay');

const sendCowsay = require('./sendCowsay').sendCowsay;
const bodyParser = require('./bodyParser');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('API Endpoints:\n/api/cowsay\n/api/listcows');
  } else if (parsedUrl.pathname === '/api/cowsay') {
    if (req.method === 'GET') {
      if (!parsedUrl.query.text) {
        sendCowsay(res, 400, 'You must inclue a text query param');
        return;
      }

      sendCowsay(res, 200, parsedUrl.query.text, parsedUrl.query.type);
    } else if (req.method === 'POST') {
      bodyParser(req)
        .then((body) => {
          if (!body.text) {
            sendCowsay(res, 400, 'You must include a json body with a text property');
            return;
          }

          sendCowsay(res, 200, body.text, body.type);
        }).catch(() => {
          sendCowsay(res, 400, 'Invalid request');
        });
    } else {
      sendCowsay(res, 405, 'Only GET and POST requests allowed');
    }
  } else if (parsedUrl.pathname === '/api/listcows') {
    cowsay.list((err, cows) => {
      sendCowsay(res, 200, `Available cow types: ${cows.join(', ')}`);
    });
  } else {
    sendCowsay(res, 400, 'Invalid route');
  }
});

module.exports = server;
