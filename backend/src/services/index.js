'use strict';
const user = require('./user');
const paygrade = require('./paygrade');
const employee = require('./employee');
const authentication = require('./authentication');

module.exports = function() {
  const app = this;

  app.configure(authentication);
  app.configure(user);
  app.configure(employee);
  app.configure(paygrade);
};
