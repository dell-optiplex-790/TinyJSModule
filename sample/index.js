var hello = require('hello');

console.log(hello.world());

var string = hello.world().match(/./gus); // split string
var reversed = '';
for(var i = string.length - 1; i > -1; i--) {
    reversed += string[i];
}


module.exports.default = reversed;