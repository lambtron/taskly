
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
    var msg = 'Github access token (only need to set this once, you can get a ';
    msg += 'token here: https://github.com/settings/applications#personal-access-tokens): ';
    var token = yield prompt(msg);
    auth = JSON.stringify({ token: token });
    fs.writeFileSync(__dirname + '/../config/auth.json', auth);
  };
};
