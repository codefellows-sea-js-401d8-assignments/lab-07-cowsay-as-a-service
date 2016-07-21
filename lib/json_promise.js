'use strict';

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    req.body = '';
    req.on('data', (data) => {
      req.body += data.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(req.body);
        resolve(req.body);
      } catch(e) {
        reject(e);
      }
    });
  });
};
