'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
require('../server');
const cowsay = require('cowsay');

const expect = chai.expect;
const request = chai.request;


describe('cowsay http server testing with chai-http', () =>{

  it('GET requiest to /cowsay to return hello-world with a status code of 200', (done) =>{
    request('localhost:3000')
    .get('/cowsay?text=hello-world')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.text).to.have.string('hello-world');
      expect(res).to.have.status(200);
      done();
    });
  });
});
