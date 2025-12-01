var hello = require('./hello');
var reverse = require('reverse-string');

console.log(hello.world());

module.exports = reverse(hello.world());
console.info(module.exports);