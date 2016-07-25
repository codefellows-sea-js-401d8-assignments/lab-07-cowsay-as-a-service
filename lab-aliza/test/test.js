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
    request('localhost:' + port)
    .post('/')
    .send({text: 'hello world'})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.text).to.eql(cowsay('hello world'));
      done();
    });
  });

  it('GET / will return API Endpoints: /api/cowsay', (done) => {
    request('localhost:' + port)
    .get('/')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql('API Endpoints:\n/api/cowsay');
      done();
    });
  });

  it('GET /api/cowsay?text=hello-world will return hello world cowsay', (done) => {
    request('localhost:' + port)
    .get('/api/cowsay?text=hello-world')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text).to.eql(cowsay('hello world'));
      done();
    });
  });
});
