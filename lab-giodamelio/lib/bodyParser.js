'use strict';

const bodyParser = function (req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    });
  });
};

module.exports = bodyParser;
