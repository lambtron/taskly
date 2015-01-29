
/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn;
var fs = require('fs');

/**
 * Check to see if there is GitHub repo saved
 */

module.exports = function *() {
  var repo = require('../config/repo.json');
  if (!repo.owner || !repo.name) yield set();
  return;
};

/**
 * Set repo.
 */

function *set() {
  var opts = ['remote', '-v'];
  var git = spawn('git', opts);
  git.stdout.setEncoding('utf8');
  var getRepo = function() {
    return function(fn) {
      git.stdout.on('data', function(data) {
        fn(null, data);
      });
    };
  };
  var res = yield getRepo();
  fs.writeFileSync(__dirname + '/../config/repo.json', repo(res));
  return;
}

/**
 * Format git remote response.
 *
 * @param {String} msg
 */

function repo(msg) {
  return JSON.stringify({
    owner: msg.match('git@github.com:(.*).git')[1].split('/')[0],
    name: msg.match('git@github.com:(.*).git')[1].split('/')[1]
  });
}
