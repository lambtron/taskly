
// look for .git file

// look for .gitignore file

// scan code base for 'TODO'

var util = require('util');
var spawn = require('child_process').spawn;
var ls = spawn('git', ['remote', '-v']);

ls.stdout.on('data', function (data) {    // register one or more handlers
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
  console.log('child process exited with code ' + code);
});