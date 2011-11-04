var PATH = require("path");
var FS = require("fs");

function readFile(path) {
	var abs_path = PATH.join(__dirname, "lib", path);
	return FS.readFileSync(abs_path, "utf8");
}

function stripCommonJS(text) {
	return text.replace(/\/\/\.CommonJS(?:.|\n)*?\/\/\/CommonJS/g, "");
}

desc("Packages lib files into the one huge");
task("default", [], function(){
	var files = [readFile("CSSOM.js")];
	var index_file = readFile("index.js");

	(function(){
		var exports = {};
		function require(path) {
			var text = readFile(path + ".js");
			files.push(stripCommonJS(text).trimLeft());
			return {};
		}
		eval(index_file);
	})();

	var build_dir = PATH.join(__dirname, "build");
	try {
		FS.statSync(build_dir);
	} catch(e) {
		FS.mkdirSync(build_dir, 0755);
	}
	var build_path = PATH.join(build_dir, "CSSOM.js");
	FS.writeFileSync(build_path, files.join(""));
	process.stdout.write("build/CSSOM.js is done\n");
});
