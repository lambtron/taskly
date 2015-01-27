
/**
 * Module dependencies.
 */

var prompt = require('prompt');
var fs = require('fs');

/**
 * Static variables.
 */

prompt.message = 'GitHub';
prompt.delimiter = ' ';
var schema = {
  properties: {
    username: {
      message: 'username:',
      required: true
    },
    password: {
      message: 'password:',
      required: true,
      hidden: true
    }
  }
};

/**
 * Check to see if there is GitHub credentials saved
 */

module.exports = function() {
  var auth = require('../config/auth');
  if (!auth.username || !auth.password) {
    prompt.start();
    prompt.get(schema, save);
  };
};

/**
 * Helper function to save auth.username and auth.password into
 * auth.json.
 *
 * @param {Object} err
 * @param {Object} res
 */

function save(err, res) {
  var auth = JSON.stringify({
    username: res.username,
    password: res.password
  });
  fs.writeFile(__dirname + '/../config/auth.json', auth, function(err) {
    if (err) throw err;
  });
}
