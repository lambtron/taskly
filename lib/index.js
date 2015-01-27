#!/usr/bin/env node

/**
 * Module dependencies.
 */

var Issues = require('./issues');
var Scan = require('./scan');
var Auth = require('./auth');

/**
 * Check auth for user.
 */

Auth();

/**
 * Scan shit.
 */
var scan = new Scan(__dirname);
scan.start();
scan.stop = createIssues;

/**
 * Create issues.
 */

function createIssues(todos) {
  var issues = new Issues();
  issues.authenticate();
  for (var i = 0; i < todos.length; i++) {
    issues.add(todos[i]);
  }
  issues.create();
}
