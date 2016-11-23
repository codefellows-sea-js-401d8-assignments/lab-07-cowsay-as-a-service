'use strict';


var cowsay = require('cowsay');

const gatherCow = module.exports = exports = function(customMoo) {
  return cowsay.say({
    text : customMoo,
    e : 'B===D',
    T : 'UU '
  });
};
