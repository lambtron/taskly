
/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn;

/**
 * Get ignored files
 *
 * @param {String} dirname
 *
 * @return {Array}
 */

module.exports.ignores = function *(dirname) {
  // .gitignore
  // TODO: add this function
  return [];
};

/**
 * Find todos.
 *
 * @param {Array} ignores
 * @param {String} dirname
 *
 * @return {Array}
 */

module.exports.todos = function *(ignores, dirname) {
  var ignoreString = '';
  var opts = ['-Hnr', 'TODO', dirname];
  for (var i = 0; i < ignores.length; i++) {
    ignoreString += ' --exclude-dir=./' + ignores[i];
    ignoreString += ' --exclude=./' + ignores[i];
  }
  if (ignoreString.length > 0) opts.push(ignoreString);
  var grep = spawn('grep', opts);
  grep.stdout.setEncoding('utf8');
  var getTodos = function() {
    return function(fn) {
      grep.stdout.on('data', function(data) {
        fn(null, data);
      });
    };
  };
  var res = yield getTodos();
  return res.trim().split('\n');
};
