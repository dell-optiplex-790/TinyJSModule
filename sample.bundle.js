(function() {
	// IMPORTANT!!! You HAVE to use ES3 on this file. Otherwise it'll break ancient browsers.
	
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
	]
	
	function makeRequire(dirname, resolve) {
	    return function require(name) {
	        var _resolve = resolve;
	        var breadcrumbs = [];
	        var nameSuffixes = ['', '.js', '/index.js'];
	        var _name = '';
	        var mName = '';
	        var directory = '';
	        var isHere = false;
	        if(typeof name != 'string') {
	            throw Error('Invalid module name!');
	        }
	        if(name.length < 1) {
	            throw Error('Invalid module name!');
	        }
	        var splitName = name.match(/./gs);
	        if(splitName[0] == '.' && splitName[1] == '/') {
	            _resolve = [dirname];
	            isHere = true;
	            for(var i = 2; i < splitName.length; i++) {
	                mName += splitName[i];
	            }
	        } else {
	            mName = name;
	        }
	        var _sname = [];
	        for(var i = 0; i < _resolve.length; i++) {
	            for(var j = 0; j < nameSuffixes.length; j++) {
	                if(_resolve[i] != '' && _resolve[i].match(/./gs)[0] == '/') {
	                    _name = _resolve[i]
	                    if(isHere) {
	                        _name += '/';
	                    }
	                    _name += mName + nameSuffixes[j];
	                } else {
	                    _name = dirname + _resolve[i] + mName + nameSuffixes[j];
	                }
	                _sname = _name.match(/./gs);
	                if(_sname[0] == '/' && _sname[1] == '/') {
	                    _name = '';
	                    for(var k = 1; k < _sname.length; k++) {
	                        _name += _sname[k];
	                    }
	                }
	                breadcrumbs = _name.match(/\/[a-zA-Z0-9._\-+=\[\]\(\)!@#$' ]+/gs);
	                directory = '/';
	                for(var k = 0; k < (breadcrumbs.length - 1); k++) {
	                    if(!(typeof breadcrumbs[k + 1] == 'string' && breadcrumbs[k + 1] == '/..')) {
	                        directory += breadcrumbs[k];
	                    } else {
	                        k++; // skip
	                    }
	                }
	                if(typeof modules.registry[_name] == 'function') {
	                    var module = {exports: {default: null}};
	                    modules.registry[_name](module, directory, mName, makeRequire(directory, resolve));
	                    modules.cache[dirname + '/' + mName] = module.exports;
	                    return module.exports;
	                }
	            }
	        }
	        if(typeof modules.cache[dirname + '/' + mName] != 'undefined') {
	            return modules.cache[dirname + '/' + mName];
	        } else {
	            throw Error('Inexistent module: ' + name);
	        }
	    }
	}
	
	var modules = {registry: {}, cache: {}};
	var Module = functions[0];
	var require = makeRequire('/', ['/node_modules/']);

	// Modules

	Module('/hello.js', function(module, __dirname, __name, require) {
		function world() {
		    return 'Hello, world!';
		}
		
		module.exports = {world: world};
	});

	Module('/index.js', function(module, __dirname, __name, require) {
		var hello = require('./hello');
		var reverse = require('reverse-string');
		
		console.log(hello.world());
		
		module.exports.default = reverse(hello.world());
	});

	Module('/node_modules/reverse-string/index.js', function(module, __dirname, __name, require) {
		var split = require('split-string');
		
		module.exports = function reverse(string) {
		    var str = split(string); // split string
		    var reversed = '';
		    for(var i = str.length - 1; i > -1; i--) {
		        reversed += str[i];
		    }
		    return reversed;
		}
	});

	Module('/node_modules/split-string/index.js', function(module, __dirname, __name, require) {
		module.exports = function split(string) {
		    return string.match(/./gs);
		}
	});


	// Return export

	var _ = require('./index');
	if(_.default != null) {
		_ = _.default;
	}
	return _;
})();