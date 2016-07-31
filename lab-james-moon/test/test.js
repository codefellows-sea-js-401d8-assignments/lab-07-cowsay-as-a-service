'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
require('../server');

describe('test cowsay on a http server', function() {
  it('/GET should return a cow saying hello world with a status code of 200', function(done) {
    request('localhost:3000')
    .get('/api/cowsay?text=hello-world')
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});
