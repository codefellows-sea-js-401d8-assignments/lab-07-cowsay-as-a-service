'use strict';

module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    let jsonString = '';
    req.on('data', (data) => {
      jsonString += data.toString();
    });
    req.on('end', () => {
      console.log(jsonString);
      try {
        let parsed = JSON.parse(jsonString);
        resolve(parsed);
      } catch(err){
        reject(err);
      }
    });
  });
};
