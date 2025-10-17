var functions = [
    function(name, func) {
        if(typeof name != 'string') {
            throw Error('Invalid module name: ' + name + '!');
        }
        if(typeof modules.registry[name] == 'function') {
            throw Error('Cannot overwrite module: ' + name)
        }
        modules.registry[name] = func;
    },
    function(name) {
        if(typeof modules.cache[name] == 'function') {
            return modules.cache[name];
        } else if(typeof modules.registry[name] == 'function') {
            var module = {};
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