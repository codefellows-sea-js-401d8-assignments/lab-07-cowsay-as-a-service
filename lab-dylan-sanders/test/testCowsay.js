'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect = chai.expect;
const request = chai.request;

require('../server');

describe('Cowsay HTTP server test', () => {
  it('GET /cowsay return cowsays', (done) => {
    request('localhost:3000')
      .get('/api/cowsay?text=hello-world')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.text).to.have.string('hello-world');
        done();
      });
  });
});
