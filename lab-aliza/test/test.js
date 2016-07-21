'use strict';

const http = require('http');
const expect = require('chai').expect;
const server = require('../lib/_server');
const cowsay = require('../lib/cowsay');
const port = 5000;

describe('cowsay', () => {
  before((done) => {
    server.listen(port, done);
  });
  after((done) => {
    server.close(done);
  });
  it('should cowsay', () => {
    expect().to.eql();
  });
});
