'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('employee service', function() {
  it('registered the employees service', () => {
    assert.ok(app.service('employees'));
  });
});
