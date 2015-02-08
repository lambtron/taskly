
/**
 * Module dependencies.
 */

var thunkify = require('thunkify-wrap');
var GitHubApi = require('github');

/**
 * Expose `Issues`.
 */

module.exports = Issues;

/**
 * Initialize a new `Issues`.
 *
 * @param {String} token
 * @param {Object} repo
 */

function Issues(token, repo) {
  if (!(this instanceof Issues)) return new Issues(token, repo);
  this.client = new GitHubApi({ version: '3.0.0', protocol: 'https', timeout: 5000 });
  this.client.authenticate({ type: 'token', token: token });
  this.issues = [];
  this.repo = repo.name || '';
  this.owner = repo.owner || '';
}

/**
 * Add issues.
 *
 * @param {Array} todos
 */

Issues.prototype.format = function(todos) {
  for (var i = 0; i < todos.length; i++) {
    var issue = {
      title: getTitle(todos[i]),
      body: getBody(todos[i], this.owner + '/' + this.repo)
    };
    this.issues.push(issue);
  }
};

/**
 * Create issues in GitHub.
 */

Issues.prototype.create = function *() {
  var createIssue = thunkify(this.client.issues.create);
  for (var i = 0; i < this.issues.length; i++) {
    var msg = {
      user: this.owner,
      repo: this.repo,
      title: this.issues[i].title,
      body: this.issues[i].body,
      labels: ['enhancement']
    };
    // yield createIssue(msg);
    console.log('Issue created: ' + this.issues[i].title);
  }
  return;
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
 * @param {String} repo
 *
 * @return {String}
 */

function getBody(todo, repo) {
  var file = todo.split(':')[0];
  var line = '#L' + todo.split(':')[1];
  return 'https://github.com/' + repo
          + '/blob/master' + file
          + line;
}
