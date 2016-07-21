'use strict';

const cowsay = require('cowsay');

module.exports.sendCowsay = (res, status, text, type) => {
  type = type || 'default';
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.end(cowsay.say({ text, f: type }));
};

