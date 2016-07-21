const expect = require('chai').expect;
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
});
