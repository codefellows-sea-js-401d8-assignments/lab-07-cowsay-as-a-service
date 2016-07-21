'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const PORT = 3000;

const server = require('../_server');
server.listen(PORT, console.log('server running on ' + PORT));

describe('Http Server testing', () => {

  it('server should respond to GET with status code 200 if correct endpoint', (done) => {
    request('localhost:3000')
    .get('/api/cowsay?text=hello-world')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200, 'this should be the code');
      done();
    });
  });
});
