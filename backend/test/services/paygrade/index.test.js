'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('paygrade service', function() {
  it('registered the paygrades service', () => {
    assert.ok(app.service('paygrades'));
  });
});
