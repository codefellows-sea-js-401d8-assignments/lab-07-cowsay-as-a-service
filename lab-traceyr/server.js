const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) =>{
  if(req.method === 'POST'){

  }
  if(req.method === 'GET'){

  }
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

}).listen(3000, () => {
  console.log('Server On');
});
