'use strict';

const http = require('http');
const fs = require('fs');
const jsonPromise = require('./jsonPromise.js');
const url = require('url');
const cowsay = require('cowsay');

http.createServer((req, res) => {
  let parsed = url.parse(req.url, true);
  if (req.method === 'GET' && parsed.pathname === '/') {
    res.write('hello');
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end();
  }

  if (parsed.pathname === '/api/cowsay') {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    if (req.method === 'GET') {
      console.log(parsed.query);
      if(!parsed.query || parsed.query == null || !parsed.query.text){
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });        res.write(cowsay.say({text: 'bad request\n try: localhost:3000/cowsay?text=howdy'}) + '\n');
        res.end();
      }else{
        res.write(cowsay.say(parsed.query) + '\n');
        res.end();
      }
    }
  } else if (req.method === 'POST') {
    res.write('cowsay POST');
    let body = '';
    req.on('data', (data) => {
      body += data;
      res.write(JSON.parse(body));
    });
    res.end();
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('Invalid pathname\n');
    res.end();
  }






  //
  // let file, statusCode;
  // jsonPromise(req)
  // .then((json) =>{
  //
  //   if(req.method === 'GET' && req.url === '/' || req.url === 'index.html'){
  //     file = fs.createReadStream('./index.html');
  //     statusCode = 200;
  //     res.writeHead(statusCode, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.write('{"API Endpoints": "/api/cowsay"}');
  //     res.end();
  //   }
  //
  //   else if(req.method === 'GET' && req.url === '/cowsay'){
  //     file = fs.createReadStream('./cowsay.html');
  //     statusCode = 200;
  //     res.writeHead(statusCode, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.write('{"msg": "cowsay!"}');
  //     res.end();
  //     file.pipe(res);
  //   }
  //
  //   else if(req.method === 'POST' && req.url === '/cowsay'){
  //     file.fs.createWriteStream('./cowsay.html');
  //     file.on('error', (err) =>{
  //       if (err.text.indexOf('ENOENT') === -1) console.log(err);
  //       res.writeHead(500, {
  //         'Content-Type': 'text/plain'
  //       });
  //       res.write('file for ' + req.url + ' already exists, try a PUT instead');
  //       res.end();
  //     });
  //     req.pipe(file);
  //   }
  //
  //   else{
  //     file = fs.createReadStream('./notFound.html');
  //     statusCode = 404;
  //     res.writeHead(statusCode, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.write('{"msg": "could not find file"}');
  //     res.end();
  //   }
  //   file.pipe(res);
  // },
  //
  // (err) => {
  //   console.log(err);
  //   res.writeHead(400, {
  //     'Content-Type': 'text/plain'
  //   });
  //   res.write('{"msg": "json error"}');
  //   res.end();
  // });

}).listen(3000, () => console.log('server up on 3000'));
