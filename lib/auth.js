
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
    auth.token = yield promptGitHubToken();
    yield setGitHubToken(auth.token);
  };
  return auth.token;
};

/**
 * Prompt GitHub token.
 *
 * @return {String} token
 */

function *promptGitHubToken() {
  var msg = 'Github access token (only need to set this once, ';
  msg    += 'you can get a token here: ';
  msg    += 'https://github.com/settings/applications#personal-access-tokens): ';
  return yield prompt(msg);
}

/**
 * Set GitHub token.
 *
 * @param {String} token
 */

function *setGitHubToken(token) {
  var auth = JSON.stringify({ token: token });
  fs.writeFileSync(__dirname + '/../config/auth.json', auth, 'utf-8');
}
