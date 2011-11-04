var fs = require('fs'), 
	path = require('path');

function JasmineRunner(options, callback){

	var doServer = options.serve,
		port = options.port || 8081,
		refreshInterval = options.refreshInterval || 2000,
		runners = options.runners || null,
		that = this;

	this.isRunningTests = false;
	this.isTestRunQueued = false;

	this.reporter = this._setupReporter(function(){

		callback();

	}); // async

	if(doServer){
		this.server = that._setupServer({
						port: port, 
						reporter: this.reporter,
						refreshInterval: refreshInterval
					});

	};

	if(runners){
		this.tests = this._setupRunners({
						runners: runners, 
						jasmineReporter: this.reporter.getJasmineReporter(),
					});
	} else {
		console.error("I don't have any tests to run!");
		process.exit(1);
	}
};

JasmineRunner.prototype._setupReporter = function(callback){
	console.debug("Setting up reporter");

	var reporter = require('./reporter-agregator.js').create({
			onDone: function(){ 
					console.debug("Reporter created.");
					callback();
			}
	});

	return reporter;

};

JasmineRunner.prototype._setupServer = function(options){
	console.debug("Setting up server");
	var that = this,
		server = require('./server.js');

	server.start(options.port, function(){
		callback(server);
	});

	options.reporter.onUpdate(function(report){
		server.updateHtml(report.html);
		server.updateJson(report.simple);

		console.debug("Tests will run again in " + (options.refreshInterval/1000) + " seconds.");
		setTimeout(function(){
			that.runTests();
		}, options.refreshInterval);
	});

	return server;
};

JasmineRunner.prototype._setupRunners = function(options,callback){
	console.debug("Setting up tests.");

	var tests = [];
	var runners = options.runners || [],
		jasmineReporter = options.jasmineReporter;

	for(var k in runners){
		var runner = runners[k];
		console.debug('Creating test based on ' + runner);

		var test = require('./runner-from-html.js').create({
			runner: runner,
			jasmineReporter: jasmineReporter
		});
		tests.push(test);
	}

	console.debug("Finished creating tests ( based on " +tests.length + " runner/s).");

	return tests;
};

JasmineRunner.prototype.runTests = function(callback){

	var that = this;

	// We have to maintain synchronisity, otherwise things
	// get hectic.
	if(this.isRunningTests) {
		// DANGER: if more than one call to runTests is made when
		// tests are running, only the last callback will ever be
		// triggered.
		this.isTestRunQueued = true;
		this.queuedCallback = callback;
		console.debug("Cannot run tests concurrently. Queued another run.");
		return;
	};
	var whenAllTestsHaveRun = function(){
		console.debug("Finished running tests.");

		if(callback) callback(that.reporter.getReport());
		that.reporter.reset();

		that.isRunningTests = false;
		if(that.isTestRunQueued){
			that.isTestRunQueued = false;
			that.runTests(that.queuedCallback);
			that.queuedCallback = false;
		}
	};

	console.debug("Running tests.");
	this.isRunningTests = true;

	var queue = [],
		tests = this.tests;
	for(var i = 0; i < tests.length; i++) queue.push(tests[i]);

	// !! Is recursive
	var runNextTest = function(){
		if(queue.length == 0){
			whenAllTestsHaveRun();
			return;
		} 

		var test = queue.pop();
		console.debug("Running " + test.name);
		test.run(function(){
			console.debug("Finished running " + test.name);
			runNextTest();
		});
	};

	runNextTest();
};

exports.run = function(options, callback){
	var onDone = options.onDone || function(){},
		debug = options.debug;

	console.debug = debug ? function(msg){ console.log(msg); } : function(msg){};

	process.on('uncaughtException', function(err){
		if(debug){
			console.debug("An uncaught error occured!");
			console.error(err.message + "\n",err.stack);
		} else {
			console.error("An error occurred while running the tests. Use the --debug switch to find out more.")
			exit(1);
		}
	});

	var runner = new JasmineRunner(options, function(){
		runner.runTests(onDone);
		callback( runner );
	});
};