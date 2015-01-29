#!/usr/bin/env node --harmony

/**
 * Module dependencies.
 */

var Issues = require('./issues');
var setAuth = require('./auth');
var setRepo = require('./repo');
var scan = require('./scan');
var co = require('co');

/**
 * Start script.
 */

co(function*() {
  yield setAuth();
  yield setRepo();
  var root = __dirname + '/../'; // TODO: how do i get the dirname of the person using the cli?
  var ignores = yield scan.ignores(root);
  var todos = yield scan.todos(ignores, root);
  var issues = new Issues();
  issues.authenticate();
  issues.add(todos);
  // issues.create();
});
