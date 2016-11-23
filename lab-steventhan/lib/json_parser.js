'use strict';

let jsonPromise = (req) => {
  return new Promise((resolve, reject) => {
    let jsonString = '';
    req.on('data', (data) => {
      jsonString += data.toString();
    });
    req.on('end', () => {
      try {
        let parsed = JSON.parse(jsonString);
        resolve(parsed);
      } catch (e) {
        reject(e);
      }
    });
  });
};

module.exports = jsonPromise;
