'use strict';

const supertest = require('supertest');

const server = require('../lib/server');

describe('Server', () => {
  it('Handle / route', (done) => {
    supertest(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/plain')
      .expect('API Endpoints:\n/api/cowsay\n/api/listcows')
      .end(done);
  });

  describe('/api/cowsay', () => {
    describe('GET', () => {
      it('Simple get', (done) => {
        supertest(server)
          .get('/api/cowsay?text=Hello World')
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' _____________\n< Hello World >\n -------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });

      it('Vader cow', (done) => {
        supertest(server)
          .get('/api/cowsay?text=Hello World&type=vader')
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' _____________\n< Hello World >\n -------------\n        \\    ,-^-.\n         \\   !oYo!\n          \\ /./=\\.\\______\n               ##        )\\/\\\n                ||-----w||\n                ||      ||\n\n               Cowth Vader') // eslint-disable-line max-len
          .end(done);
      });

      it('No text query param', (done) => {
        supertest(server)
          .get('/api/cowsay')
          .expect(400)
          .expect('Content-Type', 'text/plain')
          .expect(' ____________________________________\n< You must inclue a text query param >\n ------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });
    });

    describe('POST', () => {
      it('Simple post', (done) => {
        supertest(server)
          .post('/api/cowsay')
          .send({
            text: 'Hello From Post!',
          })
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' __________________\n< Hello From Post! >\n ------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });

      it('Vader cow', (done) => {
        supertest(server)
          .post('/api/cowsay')
          .send({
            text: 'Hello From Post!',
            type: 'vader',
          })
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' __________________\n< Hello From Post! >\n ------------------\n        \\    ,-^-.\n         \\   !oYo!\n          \\ /./=\\.\\______\n               ##        )\\/\\\n                ||-----w||\n                ||      ||\n\n               Cowth Vader') // eslint-disable-line max-len
          .end(done);
      });

      it('No text property', (done) => {
        supertest(server)
          .post('/api/cowsay')
          .send({})
          .expect(400)
          .expect('Content-Type', 'text/plain')
          .expect(' ___________________________________________________\n< You must include a json body with a text property >\n ---------------------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });

      it('Non json body', (done) => {
        supertest(server)
          .post('/api/cowsay')
          .expect(400)
          .expect('Content-Type', 'text/plain')
          .expect(' _________________\n< Invalid request >\n -----------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });
    });

    it('Invalid method', (done) => {
      supertest(server)
        .put('/api/cowsay')
        .expect(405)
        .expect('Content-Type', 'text/plain')
        .expect(' ____________________________________\n< Only GET and POST requests allowed >\n ------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
        .end(done);
    });

    it('Invalid route', (done) => {
      supertest(server)
        .put('/api/i_dont_exist')
        .expect(400)
        .expect('Content-Type', 'text/plain')
        .expect(' _______________\n< Invalid route >\n ---------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
        .end(done);
    });
  });

  describe('/api/listcows', () => {
    describe('GET', () => {
      it('Lists available cow types', (done) => {
        supertest(server)
          .get('/api/listcows')
          .expect(200)
          .expect('Content-Type', 'text/plain')
          .expect(' ______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________\n< Available cow types: beavis.zen, bong, bud-frogs, bunny, cheese, cower, daemon, default, doge, dragon-and-cow, dragon, elephant-in-snake, elephant, eyes, flaming-sheep, ghostbusters, goat, head-in, hedgehog, hellokitty, kiss, kitty, koala, kosh, luke-koala, mech-and-cow, meow, milk, moofasa, moose, mutilated, ren, satanic, sheep, skeleton, small, sodomized, squirrel, stegosaurus, stimpy, supermilker, surgery, telebears, turkey, turtle, tux, vader-koala, vader, www >\n --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||') // eslint-disable-line max-len
          .end(done);
      });
    });
  });
});
