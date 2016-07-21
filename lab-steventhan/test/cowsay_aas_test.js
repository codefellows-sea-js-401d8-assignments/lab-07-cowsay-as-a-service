'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;


let port = 8000;
require('../_server').listen(port, () => console.log('Server running at port 5000'));

describe('The cowsay API', () => {
  it('GET / should return text showing the correct url for the API endpoint', (done) => {
    request('localhost:' + port)
      .get('/')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200, 'this should be the code');
        expect(res.text).to.eql('API Endpoints: /api/cowsay');
        done();
      });
  });

  it('GET /api/cowsay?text=hello-world should return a cow saying hello world', (done) => {
    request('localhost:' + port)
      .get('/api/cowsay?text=hello-world')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200, 'this should be the code');
        expect(res.text).to.eql(' _____________\n< hello world >\n -------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||');
        done();
      });
  });
});
