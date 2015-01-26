
/**
 * Module dependencies.
 */

var dir = require('node-dir');
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
  this.issues = [];
  this.files = []; // relative paths to root
}

/**
 * Scan the code base.
 */

Scan.prototype.start = function() {
  // put all file paths in this.files
  // iterate through this.files and go through each file
  // look for TODOs; if match, add to this.issues
  dir.paths(this.dirname, true, function(err, paths) {
    if (err) throw err;
    // this.issues = paths; TODO
  }.bind(this));
};
