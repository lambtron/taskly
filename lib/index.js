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

var todos = [];

/**
 * Initialize GitHub client with Issues.
 */

var issues = new Issues();
issues.authenticate();
for (var i = 0; i < todos.length; i++) {
  issues.add(todos[i]);
}
issues.create();
