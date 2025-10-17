// THIS IS A BUILD TOOL. DO NOT CONFUSE THIS FOR SOURCE CODE.
// This is a restriction-free zone! Go wild with the modern JS syntax!!!!!

console.log(`TinyJSModule bundler\n${'='.repeat(40)}\n`)

const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
let code = '(function() {\n' + fs.readFileSync('src/index.js', 'utf8').split('\n').map(line => `\t${line}`).join('\n') + '\n\n\t// Modules';
if(!dir) {
    console.log(`Syntax: node ${__filename} <input folder>`);
    return;
}

if(!fs.existsSync(dir)) {
    console.log(`The directory ${dir} does not exist.\nSyntax: node ${__filename} <input folder>`);
    return;
}

const listing = fs.readdirSync(dir, {recursive: true}).filter(e => e.endsWith('.js')).map(e=>path.join(dir, e));
listing.forEach(file => {
    console.log(`Bundling: ${file}`)
    var content = fs.readFileSync(file, 'utf8').replaceAll('\r', '')
    content = content.split('\n').map(line => `\t\t${line}`).join('\n');
    code += `\n\n\tModule('${file.replaceAll('\\','/').split('/').at(-1).slice(0, -3)}', function(module, __name, require) {\n${content}\n\t});`;
})

code += '\n\n\n\t// Return export\n\n\tvar _ = require(\'index\');\n\tif(_.default != null) {\n\t\t_ = _.default;\n\t}\n\treturn _;\n})();'

fs.writeFileSync(path.join(dir, '..', dir + '.bundle.js'), code);
console.log('Success.')