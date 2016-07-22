'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

const cowsay = require('../lib/cowsay');

const server = require('../_server');
const port = 5000;

describe('Milking the cows', () => {
  before((done) => {
    server.listen(port);
    done();
  });

  after((done) => {
    server.close();
    done();
  });

  it('The cow goes moo or returns custom text', (done) => {
    request('localhost:5000')
      .post('/')
      .send('test')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.text).to.eql(cowsay('test'));
        done();
      });
  });
});
