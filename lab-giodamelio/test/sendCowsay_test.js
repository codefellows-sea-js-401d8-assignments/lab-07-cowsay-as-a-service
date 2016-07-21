'use strict';

const expect = require('chai').expect;

const sendCowsay = require('../lib/sendCowsay').sendCowsay;

describe('sayCowsay()', () => {
  it('Basic cowsay', () => {
    const responseShim = {
      writeHead() {},
      end(data) {
        expect(data).to.equal(' ______\n< HAHA >\n ------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||'); // eslint-disable-line max-len
      },
    };
    sendCowsay(responseShim, 200, 'HAHA');
  });
});
