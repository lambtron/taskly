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
  var root = process.cwd();
  var ignores = yield scan.ignores(root);
  var todos = yield scan.todos(ignores, root);
  var issues = new Issues();
  issues.authenticate();
  issues.add(todos);
  yield issues.create();
  // TODO: Need to erase repo.json.
});
