const assert = require('assert');
const app = require('../../src/app');

describe('\'pokemon\' service', () => {
  it('registered the service', () => {
    const service = app.service('pokemon');

    assert.ok(service, 'Registered the service');
  });
});
