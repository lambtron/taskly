
/**
 * Module dependencies.
 */

var prompt = require('co-prompt');
var fs = require('fs');

/**
 * Check to see if there is GitHub credentials saved
 */

module.exports = function *() {
  var auth = require('../config/auth');
  if (!auth.username || !auth.password) {
    var name = yield prompt('Github username: ');
    var pass = yield prompt.password('Github password: ');
    var auth = JSON.stringify({ username: name, password: pass });
    fs.writeFileSync(__dirname + '/../config/auth.json', auth);
  };
  return;
};
