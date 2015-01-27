
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
  this.user = username;
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
};

/**
 * Add issue.
 *
 * @param {Object} issue
 */

Issues.prototype.add = function(issue) {
  this.issues.push(issue);
};

/**
 * Create issues in GitHub.
 */

Issues.prototype.create = function() {
  for (var i = 0; i < this.issues.length; i++) {
    var msg = {
      user: this.user,
      repo: this.repo,
      title: this.issues[i].title,
      body: this.issues[i].body
    };
    this.client.issues.create(msg);
  }
};