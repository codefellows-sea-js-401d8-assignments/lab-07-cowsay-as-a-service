'use strict';

const cowsay = require('cowsay');

module.exports = exports = function(request,response) {
  return new Promise((resolve, reject) => {
    let json = '';
    request.on('data', (data) => {
      json += data;
    });

    request.on('end', () => {
      try{
        let parsedJson = JSON.parse(json);
        resolve(parsedJson);
        response.write(cowsay.say(JSON.parse(json)) + '\n');
        response.end();
      } catch(e){
        reject(e);
      }
    });
  });
};
