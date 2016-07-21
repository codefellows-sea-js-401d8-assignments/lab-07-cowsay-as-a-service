'use strict';

const http = require('http');
const cowsay = require('cowsay');
const serverPort = 3000;

function handleReq(req, res){
  console.log(req.url);
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () =>{
    let jsonData = JSON.parse(body);
    console.log(cowsay.say(jsonData));
  });
  res.end('POST request completed\r\n');
}


let server = http.createServer(handleReq);

server.listen(serverPort, function(){
  console.log('Server is listening on http://localhost:' + serverPort);
});

//POST request example...
//curl -H "Content-Type: application/json" -X POST -d '{"text":"Moooooo"}' http://localhost:3000
