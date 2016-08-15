'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const jsonPromise = require('../../lib/jsonPromise.js');
const serverPort = 3000;

function handleReq(req, res){
  console.log(req.url);

  if (req.method === 'POST' && req.url === '/api/cowsay') {
    jsonPromise(req)
      .then((json) => {
      //success
        console.log('sucess');
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write(cowsay.say(json));
        res.end();
      }, (err) => {
      //Error
        console.log(err);
        res.writeHead(400, {
          'Content-Type': 'application/json'
        });
        res.write('Error!');
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
      res.write('Please format your request in this format: text=message');
    }
  }

  if (req.url !== '/api/cowsay'){
    res.writeHead(400, {
      'Content-Type': 'application/json'
    });
    res.write('Error! Please direct your request to our endpoint /api/cowsay!\r\n');
    res.end();
  }
}





let server = http.createServer(handleReq);

server.listen(serverPort, function(){
  console.log('Server is listening on http://localhost:' + serverPort + '/api/cowsay');
});

//POST request example...
//curl -H "Content-Type: application/json" -X POST -d '{"text":"Moooooo"}' http://localhost:3000/api/cowsay
