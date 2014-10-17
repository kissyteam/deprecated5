var fs = require('fs'),
	path = require('path');
var uglify = require('uglify-js');

var srcDir = path.resolve(process.cwd(), 'src');
var buildDir = path.resolve(process.cwd(), 'build');

if(!fs.existsSync(buildDir)){
	fs.mkdir(buildDir);
}

var debugContent = fs.readFileSync(path.join(srcDir, 'deprecated.js')).toString();
fs.writeFileSync(path.join(buildDir, 'deprecated-debug.js'), debugContent);
fs.writeFileSync(path.join(buildDir, 'deprecated.js'), uglify.minify(debugContent, { fromString : true }).code);