
/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn;
var fs = require('fs');

/**
 * Get ignored files
 *
 * @param {String} root
 *
 * @return {Array}
 */

module.exports.ignores = function *(root) {
  var gitignore = fs.readFileSync(root + '/.gitignore', 'utf8').split('\n');
  var ignores = [];
  for (var i = 0; i < gitignore.length; i++) {
    if (gitignore[i].length === 0 || gitignore[i].charAt(0) === '#')
      continue;
    ignores.push(gitignore[i]);
  }
  return ignores;
};

/**
 * Find todos.
 *
 * @param {Array} ignores
 * @param {String} root
 *
 * @return {Array}
 */

module.exports.todos = function *(ignores, root) {
  var ignoreString = '';
  var opts = ['-Hnr', 'TODO', root];
  for (var i = 0; i < ignores.length; i++) {
    ignoreString += ' --exclude-dir=./' + ignores[i];
    ignoreString += ' --exclude=./' + ignores[i];
  }
  if (ignoreString.length > 0)
    opts.push.apply(opts, ignoreString.trim().split(' '));
  var grep = spawn('grep', opts);
  grep.stdout.setEncoding('utf8');
  var getTodos = function() {
    return function(fn) {
      grep.stdout.on('data', function(data) {
        fn(null, data);
      });
      grep.stderr.on('data', function(data) {
        fn(data, null);
      });
      grep.on('exit', function(code) {
        fn(null, 'Exited with ' + code);
      });
    };
  };
  var res = yield getTodos();
  return res.replace(new RegExp(root, 'g'), '').trim().split('\n');
};
