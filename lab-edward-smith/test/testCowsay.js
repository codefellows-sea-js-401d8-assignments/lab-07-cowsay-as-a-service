'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const cowsay = require('cowsay')

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
require('../lib/server');

describe('HTTP Server ', () => {
  it('returns the API endpoints', (done) => {
    request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.text).to.eql('API Endpoints:\n/api/cowsay')
        done();
      })
  })

  describe('HTTP endpoint /api/cowsay', () => {
    it('should return a cow', (done) => {
      request('localhost:3000')
        .get('/api/cowsay')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.eql(cowsay.say({text: 'bad request\ntry localhost:3000/api/cowsay?text=howdy' }));
          done();
        })
    })

    describe('HTTP post to endpoint /api/cowsay', () => {
      it('should return a cow with post request', (done) => {
        request('localhost:3000')
          .post('/api/cowsay?text=hello')
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.text).to.eql(cowsay.say({text: 'hello'}))
            done();
          })
      })
    })
  })
})
