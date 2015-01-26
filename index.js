
var dir = require('node-dir');

dir.paths(__dirname, true, function(err, paths) {
  if (err) throw err;
  console.log('paths:\n',paths);
});
