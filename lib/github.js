
/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn;
var request = require('superagent');
var util = require('util');

/**
 * Expose `GitHub`.
 */

module.exports = GitHub;

/**
 * Initialize a new `Github`.
 */

function GitHub() {
  if (!(this instanceof GitHub)) return new GitHub();
  this.path = '';
  this.issues = [];
}

/**
 * Set GitHub remote address path.
 */

GitHub.prototype.set = function() {
  var git = spawn('git', ['remote', '-v']);
  git.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
    // Somehow set this.path
  });
  this.path = '/repos/' + '/issues';
};

/**
 * Create GitHub issues.
 */

GitHub.prototype.createIssues = function() {
  for (var i = 0; i < this.issues.length; i++) {
    createIssue(this.path, this.issues[i]);
  }
};

/**
 * Helper function to create GitHub issue.
 *
 * @param {String} path
 * @param {Object} issue
 *   @property {String} title
 *   @property {String} body
 */

function createIssue(path, issue) {
  var domain = 'https://api.github.com';
  request
    .post(domain + path)
    .set('Accept', 'application/vnd.github.v3+json')
    .send(issue)
    .end(function(err, res) {
      // Derp.
    });
};

// git@github.com:lambtron/taskly.git
// =>
// POST /repos/lambtron/taskly/issues
// title:
// body: two lines above, two lines below
//       also include a link:
//    https://github.com/lambtron/taskly/blob/master/lib/index.js#L8



