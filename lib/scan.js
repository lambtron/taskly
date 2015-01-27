
/**
 * Module dependencies.
 */

var spawn = require('child_process').spawn;
var util = require('util');
var fs = require('fs');

/**
 * Expose `Scan`.
 */

module.exports = Scan;

/**
 * Initialize a new `Scan`.
 *
 * @param {String} dirname
 */

function Scan(dirname) {
  if (!(this instanceof Scan)) return new Scan(dirname);
  this.keywords = ['TODO'];
  this.dirname = dirname;
  this.todos = [];
}

/**
 * Scan the code base.
 */

Scan.prototype.start = function() {
  // grep TODO -rno __dirname
  var grep = spawn('grep', ['TODO', '-rno', this.dirname]);
  grep.stdout.on('data', function(data) {
    this.todos.push(data);
  }.bind(this));
  grep.stdout.on('exit', this.end(this.todos));
};

/**
 * This function is called when grep is completed.
 */

Scan.prototype.end = function(todos) {
  console.log('grep finished.');
};
