
/**
 * Module dependencies.
 */

var GitHubApi = require('github');

/**
 * Expose `Issues`.
 */

module.exports = Issues;

/**
 * Initialize a new `Issues`.
 */

function Issues() {
  if (!(this instanceof Issues)) return new Issues();
  this.client = new GitHubApi({
    version: '3.0.0',
    protocol: 'https',
    timeout: 5000,
  });
  this.issues = [];
  this.repo = '';
  this.owner = '';
}

/**
 * Authenticate GitHub client.
 */

Issues.prototype.authenticate = function() {
  var auth = require('../config/auth.json');
  this.client.authenticate({
    type: 'basic',
    username: auth.username,
    password: auth.password
  });
  var repo = require('../config/auth');
  this.repo = repo.name;
  this.owner = repo.owner;
};

/**
 * Add issue.
 *
 * @param {Array} todos
 */

Issues.prototype.add = function(todos) {
  for (var i = 0; i < todos.length; i++) {
    var issue = {
      title: getTitle(todos[i]),
      name: getBody(todos[i])
    };
    this.issues.push(issue);
  }
};

/**
 * Create issues in GitHub.
 */

Issues.prototype.create = function() {
  for (var i = 0; i < this.issues.length; i++) {
    var msg = {
      user: this.owner,
      repo: this.repo,
      title: this.issues[i].title,
      body: this.issues[i].body
    };
    this.client.issues.create(msg);
  }
};

/**
 * Helper function to generate the issue title.
 *
 * @param {String} todo
 *
 * @return {String}
 */

function getTitle(todo) {
  return todo.substring(todo.indexOf('TODO'));
}

/**
 * Helper function to generate the issue body.
 *
 * @param {String} todo
 *
 * @return {String}
 */

function getBody(todo) {
  var line = todo.split(':')[1];
  var body = 'https://github.com/'
           + this.owner + '/' + this.repo
           + '/blob/master/' + '/' + line;
  return;
  // TODO: need to figure out how to find root directory.
}
