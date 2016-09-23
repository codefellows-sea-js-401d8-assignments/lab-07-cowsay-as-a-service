'use strict';
module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    let  cowsay = '';
    req.on('data', (data) => {
      cowsay += data.toString();
    });
    
    req.on('end', () => {
      try {
        let parsedCowsay = JSON.parse(cowsay);
        resolve(parsedCowsay);
      } catch(e) {
        reject(e);
      }
    });
  });
};
