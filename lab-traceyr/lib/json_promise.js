'use strict';

module.exports = exports = function(req){
  return  new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (data) =>{
      body += data.toString();
    });

    req.on('end', () => {
      try {
        let parsed = JSON.parse(body);
        resolve(parsed);
      } catch(e) {
        reject(e);
      }
    });
  });
};
