  'use strict';
  const jsonPromise = require('../json_promise');
  const http = require('http');
  const cowsay = require('../bin/cowsay');

  http.createServer((req, res) => {
      jsonPromise(req)
          .then((json) => {
              res.writeHead(200, {
                  'Content-Type': 'application/json'
              });
              res.write('{"msg": "you said: "' + json.msg + '"}');
              res.end();
          }, (err) => {
              console.log(err);
              res.writeHead(400, {
                  'Content-Type': 'application/json'
              });
              res.write('{"msg": "json error"}');
              res.end();
          });
  }).listen(3000, () => console.log('server up'));


  // const fs = require('fs');
  // const url = require('url');

  //     var file, statusCode;
  //     let parsed = url.parse(req.url, true);
  //     if (req.method === 'GET' && (req, url === '/' || req.url === '/index.html')) {
  //         file = fs.createReadStream(__dirname + '/index.html');
  //         statusCode = 200;
  //     }
  //     ele {
  //         file = fs.createReadStream(__dirname + '/four_oh_four.html');
  //         statusCode = 404;
  //     }
  //     res.writeHead(statusCode, {
  //         "Content-Type": "text/plain"
  //     });
  //     file.pipe(res);
  // }).listen(3000, () => {
  //     console.log('server up');
  // });
