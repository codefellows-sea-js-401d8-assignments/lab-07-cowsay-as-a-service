const supertest = require('supertest');

const server = require('../lib/server');

describe('Server', () => {
  it('Handle / route', (done) => {
    supertest(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/plain')
      .expect('API Endpoints:\n/api/cowsay')
      .end(done);
  });

  describe('/api/cowsay', () => {
    describe('GET', () => {
      it('Simple get', (done) => {
        supertest(server)
          .get('/api/cowsay?text=Hello World')
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' _____________\n< Hello World >\n -------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });

      it('No text query param', (done) => {
        supertest(server)
          .get('/api/cowsay')
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' ____________________________________\n< You must inclue a text query param >\n ------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });
    });

    describe('POST', () => {
      it('Simple post', (done) => {
        supertest(server)
          .post('/api/cowsay')
          .send({
            text: 'Hello From Post!',
          })
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' __________________\n< Hello From Post! >\n ------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });

      it('No text property', (done) => {
        supertest(server)
          .post('/api/cowsay')
          .send({})
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' ___________________________________________________\n< You must include a json body with a text property >\n ---------------------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });

      it('Non json body', (done) => {
        supertest(server)
          .post('/api/cowsay')
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' _________________\n< Invalid request >\n -----------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });
    });

    it('Invalid method', (done) => {
      supertest(server)
        .put('/api/cowsay')
        .expect(200)
        .expect('Content-Type', 'text/plain')
        .expect(' ____________________________________\n< Only GET and POST requests allowed >\n ------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
        .end(done);
    });

    it('Invalid route', (done) => {
      supertest(server)
        .put('/api/i_dont_exist')
        .expect(200)
        .expect('Content-Type', 'text/plain')
        .expect(' _______________\n< Invalid route >\n ---------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
        .end(done);
    });
  });
});
