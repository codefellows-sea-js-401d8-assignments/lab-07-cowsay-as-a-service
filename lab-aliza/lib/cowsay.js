'use strict';

const cowsay = require('cowsay');

const getCowsay = function(inputString) {
  return cowsay.say({
    text : inputString,
    e : 'oO',
    T : 'U'
  });
};

module.exports = getCowsay;
