// Tail = require('tail').Tail;

// tail = new Tail("log.log");

// tail.on("line", function(data) {
//   console.log(data);
// });


var Tail = require('always-tail');
var fs = require('fs');
var filename = "log.log";
const jq = require('node-jq')
if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");

var tail = new Tail(filename, '\n');

tail.on('line', function(data) {
  console.log("got line:", data);
});


tail.on('error', function(data) {
  console.log("error:", data);
});


jq.run('.', 'log.log', { output: 'json' }).then(console.log)
// [
//   {
//     "foo": "bar"
//   },
//   {
//     "otherFoo": "andBar"
//   }
// ]

tail.watch();
