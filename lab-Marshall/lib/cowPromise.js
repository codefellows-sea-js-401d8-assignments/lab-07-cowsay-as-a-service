'use strict';

const cowPromise = module.exports = exports = function(req){
  return new Promise((resolve, reject) => {
    let mooString = '';
    req.on('data', (data) => {
      mooString = data.toString();
    });

    req.on('end', () => {
      try {
        let parsed = JSON.parse(mooString);
        resolve(parsed);
      } catch(e) {
        reject(e);
      }
    });
  });
};
