'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const cowsay = require('../lib/cowsay');
const server = require('../lib/_server');
const port = 5000;

describe('HTTP Cowsay Testing', () => {
  before((done) => {
    server.listen(port);
    done();
  });

  after((done) => {
    server.close();
    done();
  });

  it('POST request will return cowsay with text', (done) => {
    request('localhost:5000')
    .post('/')
    .send({text: 'testing cowsay'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql(cowsay('testing cowsay'));
      done();
    });
  });
});
