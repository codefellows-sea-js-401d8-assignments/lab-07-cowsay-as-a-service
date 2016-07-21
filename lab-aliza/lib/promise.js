'use strict';

const cowsayPromise = function(req) {
  return new Promise((resolve, reject) => {
    let cowsayString = '';
    req.on('data', (data) => {
      cowsayString = data.toString();

    });
    req.on('end', () => {

      try {
        let parsed = JSON.parse(cowsayString);
        resolve(parsed);
      } catch(e) {
        reject(e);
      }
    });
  });
};

module.exports = cowsayPromise;
