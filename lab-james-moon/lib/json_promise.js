'use strict';

module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    var jsonString = '';
    req.on('data', (data) => {
      jsonString = jsonString + data.toString();
    });

    req.on('end', () => {
      try {
        let parsed = JSON.parse(jsonString);
        resolve(parsed);
      } catch(e) {
        reject(e);
      }
    });
  });
};
