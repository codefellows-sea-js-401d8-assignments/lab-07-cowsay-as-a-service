'use strict';
const jsonPromise = require('./lib/json_promise');
const http = require('http');

http.createServer((req, res) => {
  jsonPromise(req)
    .then((json) => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write('{"msg": "< "' + json.msg + '" >}');
      res.end();
    }, (err) => {
      console.log(err);
      res.writeHead(400, {
        'Content-Type': 'application/json'
      });
      res.write('{"msg": "json error"}');
      res.end();
    });
}).listen(3000, () => console.log('server up on port 3000'));
