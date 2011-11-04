function Runner( options ){
	console.debug("Constructing runner for "+options.runner+".");

	var name, path,
		runner = options.runner;
	if(typeof runner == 'object'){
		name = runner.name;
		path = runner.runner;
	} else {
		name = runner;
		path = runner;
	}

	this._options = {
		reporter: options.jasmineReporter || {},
		path: require('path').normalize(path),
		name: name
	};
};

Runner.prototype._getScriptPaths = function(pathToHtml, callback){
	var path = require('path');
	require('jsdom').env({
		html: pathToHtml,
		scripts: [],
		done: function(errors,window){
			if(errors){
				console.error('Error when constructing DOM to get script paths for runner.');
				console.debug(errors);
				exit(1);
			}

			var basePath = path.dirname(pathToHtml);
			var scripts = window.document.getElementsByTagName('script');
			var scriptPaths = []

			for(var i = 0; i < scripts.length; i++){
				var script = scripts[i];
				var src = script.getAttribute('src');
				if(src) {
					var scriptPath = path.normalize(basePath + "/" + src);
					scriptPaths.push(scriptPath);
				}
			}
			callback(scriptPaths);
		}
	});
};

Runner.prototype._executeRunner = function(pathToHtml, scripts, reporter, callback){
	console.debug("Constructing runner with following scripts: ");
	for(var i = 0; i < scripts.length; i++) console.debug(" - " + scripts[i]);

	require('jsdom').env({
		html: pathToHtml,
		scripts: scripts,
		done: function(errors,window){
			if(errors){
				console.error('Error when constructing DOM for runner.');
				console.debug(errors);
				exit(1);
			}

			// Executed when the DOM has finished construction
			if(errors) console.error('Error construction DOM for tests: ',errors);
			window.jasmine.getEnv().addReporter(reporter);
			window.jasmine.getEnv().addReporter({
				reportRunnerResults : function(){
					if(callback) callback();
				}
			});

			console.debug("Running runner in Jasmine.");
			window.jasmine.getEnv().execute();

		}
	});
};

Runner.prototype.run = function(callback){
	var path = this._options.path,
		name = this._options.name,
		reporter = this._options.reporter,
		that=this;

	console.debug("Running runner " + name);
	if(reporter.reportStartingGroup) reporter.reportStartingGroup(name);

	this._getScriptPaths(path, function(scripts){
		that._executeRunner(path,scripts,reporter,function(){
			callback();
		});
	});

};

exports.create = function(options){
	return new Runner(options);
}