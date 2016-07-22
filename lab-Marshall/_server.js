'use strict';

const cowPromise = require('./lib/cowPromise');
const http = require('http');
const cowsay = require('./lib/cowsay');

const server = module.exports = exports = http.createServer((req, res) => {

  if(req.method === 'POST' && req.url === '/moo') {
    cowPromise(req)
    .then((Moo) => {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.write(cowsay(Moo.text));
      res.end();
    }, (err) => {
      console.log(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write('The cow did not MOOOOOOOOOOOOOOOOOO!!!!!!!!!!');
      res.end();
    });
  }
}).listen(3000, () => console.log('Server up on 3000!'));
