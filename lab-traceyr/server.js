const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) =>{
  jsonPromise(req)
  .then((json) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    })
  })
});
