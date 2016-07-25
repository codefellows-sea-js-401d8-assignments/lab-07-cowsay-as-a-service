'use strict';

const http = require('http');
const fs = require('fs');
const cowsay = require('lib/cowsay.js');
const url = require('url');

http.createServer ((req, res, () => {
  var file, statusCode;
  let parsed = url.parse(req.url, true);
  if (req.method === 'GET' && (req.url === '/' || req.url === 'lib/cowsay.js')) {
    file = fs.createReadStream(__dirname + 'lib/cowsay.js');
    statusCode = 200;
  } else {
  file = fs.createReadStream(__dirname + 'test/error_message.html');
  statusCode = 404;
  }
})
