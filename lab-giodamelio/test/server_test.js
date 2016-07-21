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

  describe('GET /api/cowsay', () => {
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
});
