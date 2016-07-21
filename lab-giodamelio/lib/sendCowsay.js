const cowsay = require('cowsay');

module.exports.sendCowsay = (res, text) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(cowsay.say({text}));
};

