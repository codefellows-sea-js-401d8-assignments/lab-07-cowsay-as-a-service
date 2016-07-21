'use strict';

const cowPromise = require('./lib/cowPromise');
const http = require('http');

http.createServer((req, res) => {

  if(req.method === 'GET') {
    cowPromise(req)
    .then((json) => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write('{"msg": "The cow goes": "' + json.moo + '"}');
      res.end();
    }, (err) => {
      console.log(err);
      res.writeHead(400, {
        'Content-Type': 'application/json'
      });
      res.write('{"msg": "json error!!!!!"}');
      res.end();
    });
  }
}).listen(3000, () => console.log('Server up on 3000!'));
