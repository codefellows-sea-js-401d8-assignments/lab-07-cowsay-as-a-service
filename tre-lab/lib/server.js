'use strict';

const http = require('http');
const cowsay = require('cowsay');
const url = require('url');
const jsonPromise = require('./json_promises.js');

http.createServer((req, res) => {
  let parsedUrl = url.parse(req.url, true);
  console.log('parsedUrl', parsedUrl.query);
  console.log(req.method);
  if (parsedUrl.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('API Endpoints:\n/api/cowsay');
    res.end();
    return;
  }

  if(req.url.pathname === '/api/cowsay/list') {
    cowsay.list((err, cows) => {
      respond(res, 200, {'Content-Type': 'text/plain'}, cows.join(', ') , false);
    });
  }

  if (parsedUrl.pathname === '/api/cowsay') {
    if (req.method === 'GET') {
      //send through to cowsay
      if (!parsedUrl.query || parsedUrl.query === null || !parsedUrl.query.text) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\n try: localhost:3000/api/cowsay text==howdy'
        }));
        res.end();
        return;
      } else {
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: parsedUrl.query.text}));
        res.end();
      }
    } else if (req.method === 'POST') {
      jsonPromise(req)
      .then((json) => {
        if (json.text) {
          res.writeHead(200, {'Content-Type': 'text/plain'
          });
          res.write(cowsay.say({text: json.text}));
          return res.end();
        }
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({
          text: 'bad request\ntry: localhost:3000/cowsay text==howdy'
        }));
        res.end();
      }, (err) => {
        console.log(err);
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write(cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay text==howdy'}));
        res.end();
      });
    }
  }
}).listen(3000, () => console.log('server up on 3000'));
