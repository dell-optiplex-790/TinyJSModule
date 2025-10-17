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