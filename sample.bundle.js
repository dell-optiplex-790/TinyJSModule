(function() {
	var functions = [
	    function(name, func) {
	        if(typeof name != 'string') {
	            throw Error('Invalid module name!');
	        }
	        if(typeof modules.registry[name] == 'function') {
	            throw Error('Cannot overwrite module!')
	        }
	        modules.registry[name] = func;
	    },
	    function(name) {
	        if(typeof name != 'string') {
	            throw Error('Invalid module name!');
	        }
	        if(typeof modules.cache[name] != 'undefined') {
	            return modules.cache[name];
	        } else if(typeof modules.registry[name] == 'function') {
	            var module = {exports: {default: null}};
	            modules.registry[name](module, name, require);
	            modules.cache[name] = module.exports;
	            return module.exports;
	        } else {
	            throw Error('Inexistent module: ' + name)
	        }
	    }
	]
	
	var modules = {registry: {}, cache: {}};
	var Module = functions[0];
	var require = functions[1];

	// Modules

	Module('hello', function(module, __name, require) {
		function world() {
		    return 'Hello, world!';
		}
		
		module.exports = {"world": world};
	});

	Module('index', function(module, __name, require) {
		var hello = require('hello');
		
		console.log(hello.world());
		
		var string = hello.world().match(/./gus); // split string
		var reversed = '';
		for(var i = string.length - 1; i > -1; i--) {
		    reversed += string[i];
		}
		
		
		module.exports.default = reversed;
	});


	// Return export

	var _ = require('index');
	if(_.default != null) {
		_ = _.default;
	}
	return _;
})();