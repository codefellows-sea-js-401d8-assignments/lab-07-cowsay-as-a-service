const stream = require('stream');

const expect = require('chai').expect;

const bodyParser = require('../lib/bodyParser.js');

describe('bodyParser()', () => {
  it('Parses simple json body', () => {
    const fakeRequest = new stream.Readable();

    fakeRequest.push(JSON.stringify({
      hello: 'world',
    }));
    fakeRequest.push(null);

    return bodyParser(fakeRequest)
      .then((body) => {
        expect(body).to.eql({
          hello: 'world',
        });
      });
  });

  it('Fails to parse non json data', () => {
    const fakeRequest = new stream.Readable();

    fakeRequest.push('I am not json');
    fakeRequest.push(null);

    return bodyParser(fakeRequest)
      .catch((err) => {
        expect(err.message).to.have.string('Unexpected token I');
      });
  });
});
