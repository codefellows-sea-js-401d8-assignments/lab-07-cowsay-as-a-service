'use strict';

module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      try {
        let parsed = JSON.parse(body);
        resolve(parsed);
      } catch(err) {
        reject(err);
      }
    });
  });
};
