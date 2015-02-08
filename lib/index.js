#!/usr/bin/env node --harmony

/**
 * Module dependencies.
 */

var program = require('commander');
var Issues = require('./issues');
var Auth = require('./auth');
var Repo = require('./repo');
var scan = require('./scan');
var co = require('co');

/**
 * Set options.
 */

program
  .version('0.1.1')
  .option('-i, --include', 'include .gitignore files')
  .parse(process.argv);

/**
 * Start script.
 */

co(function*() {
  var auth = yield Auth();
  var repo = yield Repo();
  var root = process.cwd();
  var dir = program.args[0] || root;
  var ignores = [];
  if (!program.include) ignores =  yield scan.ignores(root);
  var todos = yield scan.todos(ignores, dir);
  var issues = new Issues(auth, repo);
  issues.format(todos);
  yield issues.create();
});
