'use strict';

let jsonPromise = (req) => {
  return new Promise((resolve, reject) => {
    let stringified = '';
    req.on('data', (data) => {
      stringified += data.toString();
    });
    req.on('end', () => {
      try {
        let parsed = JSON.parse(stringified);
        resolve(parsed);
      } catch (e) {
        reject({
          error: e,
          input: stringified
        });
      }
    });
  });
};

module.exports = jsonPromise;
