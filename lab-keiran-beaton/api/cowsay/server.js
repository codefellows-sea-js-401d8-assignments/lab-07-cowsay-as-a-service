'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const jsonPromise = require('../../lib/promise.js');
const serverPort = 3000;

function handleReq(req, res){
  console.log(req.url);

  if (req.method === 'POST' && req.url === '/api/cowsay') {
    jsonPromise(req)
      .then((json) => {
        console.log('success');
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write(cowsay.say(json));
        res.end();
      }, (err) => {
        console.log(err);
        res.writeHead(400, {
          'Content-Type': 'application/json'
        });
        res.write('Error');
        res.end();
      });
  }

  if (req.method === 'GET'){
    var queryData = url.parse(req.url, true).query;
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    if (queryData.text){
      console.log(queryData.text);
      res.write(cowsay.say({text: queryData.text}));
    }
    else{
      res.write('Error');
    }
  }

  if (req.url !== '/api/cowsay'){
    res.writeHead(400, {
      'Content-Type': 'application/json'
    });
    res.write('Error. Make sure your endpoint is api/cowsay\r\n');
    res.end();
  }
}





let server = http.createServer(handleReq);

server.listen(serverPort, function(){
  console.log('Server is listening on http://localhost:' + serverPort + '/api/cowsay');
});
