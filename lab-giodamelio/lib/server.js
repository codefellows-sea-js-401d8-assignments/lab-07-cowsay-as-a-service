'use strict';

const http = require('http');
const url = require('url');

const sendCowsay = require('./sendCowsay').sendCowsay;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('API Endpoints:\n/api/cowsay');
  } else if (parsedUrl.pathname === '/api/cowsay') {
    if (req.method === 'GET') {
      if (!parsedUrl.query.text) {
        sendCowsay(res, 400, 'You must inclue a text query param');
        return;
      }

      sendCowsay(res, 200, parsedUrl.query.text);
    } else if (req.method === 'POST') {
      let body = '';

      req.on('data', (data) => {
        body += data.toString();
      });

      req.on('end', () => {
        try {
          const options = JSON.parse(body);
          if (!options.text) {
            sendCowsay(res, 400, 'You must include a json body with a text property');
            return;
          }

          sendCowsay(res, 200, options.text);
        } catch (e) {
          sendCowsay(res, 400, 'Invalid request');
        }
      });
    } else {
      sendCowsay(res, 405, 'Only GET and POST requests allowed');
    }
  } else {
    sendCowsay(res, 400, 'Invalid route');
  }
});

module.exports = server;
