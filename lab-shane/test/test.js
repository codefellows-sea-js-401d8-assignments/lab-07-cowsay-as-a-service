'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const server = require('../lib/server.js');

describe('Cowsay as a service testing', () => {
  it('should return a status code of "200"', (done) => {
    request('localhost:3000/api')
      .get('/cowsay?text=hello-world')
      .end(function(err, res) {
        expect(err).to.eql(null, 'Error is null');
        expect(res).to.have.status(200, 'this is the status code');
        done();
      });
  });
});
