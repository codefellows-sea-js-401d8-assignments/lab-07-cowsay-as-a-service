'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const request = chai.request;

chai.use(chaiHttp);

require('../_server').listen(3000, () => console.log('Server running at port 3000'));

describe('The cowsay API', () => {
  it('GET / should return text showing the correct url for the API endpoint', (done) => {
    expect(true).to.be.false;
    done();
  });
});
