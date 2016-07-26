const cowsay = require('cowsay');

const server = require('./server');
const port = 3000;

server.listen(port, (err) => {
  if (err) return console.log(err);

  return console.log(cowsay.say({
    text: `Server started at http://localhost:${port}`,
  }));
});
