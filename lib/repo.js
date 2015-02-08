
/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn;
var fs = require('fs');

/**
 * Get repo.
 *
 * @return {Object} repo
 */

module.exports = function *() {
  var git = spawn('git', ['remote', '-v']);
  git.stdout.setEncoding('utf8');
  var getRepo = function() {
    return function(fn) {
      git.stdout.on('data', function(data) {
        fn(null, data);
      });
    };
  };
  var res = yield getRepo();
  return fmtRepo(res);
}

/**
 * Format git remote response.
 *
 * @param {String} msg
 *
 * @return {Object} repo
 */

function fmtRepo(msg) {
  return {
    owner: msg.match('git@github.com:(.*).git')[1].split('/')[0],
    name: msg.match('git@github.com:(.*).git')[1].split('/')[1]
  };
}
