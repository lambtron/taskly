
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
  if (!auth.token) {
    var token = yield prompt('Github access token (only need to set this once): ');
    auth = JSON.stringify({ token: token });
    fs.writeFileSync(__dirname + '/../config/auth.json', auth);
  };
  return;
};
