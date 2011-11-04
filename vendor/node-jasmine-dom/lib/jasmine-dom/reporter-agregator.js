var path = require('path');
var cp = function(o){ if(typeof o != 'object') return o; var n = {}; for(var k in o) n[k] = o[k]; return n; };

function Reporter(options){

	var onDone = options.onDone || function(){};

	/**
	 * A reporter should implement the jasmine reporter interface
	 * as well as the following properties:
	 * - {string} format         e.g. 'html'
	 * - {function} getReport()
	 * - {function} updateReport()
	 * - {function} reset()
	 */
	this._updateListeners = [];

	this.report = {};
	this._jasmineReporters = {};
	this._jasmineReporters['simpleReporter'] = require('./reporter-simple').create();
	this._jasmineReporters['junitReporter'] = require('./reporter-junit').create();
	this._jasmineReporters['htmlReporter'] = require('./reporter-html').create({
		jasminePath: path.normalize(__dirname+'/resources/jasmine.js'),
		jasmineHtmlPath: path.normalize(__dirname+'/resources/jasmine-html.js'),
		skeletonPath: path.normalize(__dirname+'/resources/skeleton.html')
	}, onDone);
}

Reporter.prototype._updateReport = function(){
	// tell reporters to update themselves
	for(var k in this._jasmineReporters){
		var reporter = this._jasmineReporters[k];
		reporter.updateReport();
		this.report[reporter.format] = reporter.getReport();
	}

	for(var i = 0; i < this._updateListeners.length; i++){
		this._updateListeners[i]( cp(this.report) );
	}
};

Reporter.prototype.getJasmineReporter = function(){
	var that = this;
	return {
		log : function(str){
			for(var k in that._jasmineReporters){
				var reporter = that._jasmineReporters[k];
				if(reporter.log) reporter.log(str);
			}
		},
		reportSpecStarting : function(runner) {
			for(var k in that._jasmineReporters){
				var reporter = that._jasmineReporters[k];
				if(reporter.reportSpecStarting) reporter.reportSpecStarting(runner);
			}
		},
		reportRunnerStarting : function(runner) { 
			for(var k in that._jasmineReporters){
				var reporter = that._jasmineReporters[k];
				if(reporter.reportRunnerStarting) reporter.reportRunnerStarting(runner);
			}
		},
		reportSuiteResults : function(suite) { 
			for(var k in that._jasmineReporters){
				var reporter = that._jasmineReporters[k];
				if(reporter.reportSuiteResults) reporter.reportSuiteResults(suite);
			}
		},
		reportSpecResults : function(spec) { 
			for(var k in that._jasmineReporters){
				var reporter = that._jasmineReporters[k];
				if(reporter.reportSpecResults) reporter.reportSpecResults(spec);
			}
		},
		reportRunnerResults : function(runner) {
			for(var k in that._jasmineReporters){
				var reporter = that._jasmineReporters[k];
				if(reporter.reportRunnerResults) reporter.reportRunnerResults(runner);
			}
			that._updateReport();
		},
		reportStartingGroup : function(name){
			for(var k in that._jasmineReporters){
				var reporter = that._jasmineReporters[k];
				if(reporter.reportStartingGroup) reporter.reportStartingGroup(name);
			}
		}
	};
};

Reporter.prototype.onUpdate = function(callback){
	this._updateListeners.push(callback);
};

Reporter.prototype.getReport = function(){
	return this.report;
};

Reporter.prototype.reset = function(){
	
	for(var k in this._jasmineReporters){
		var reporter = this._jasmineReporters[k];
		reporter.reset();
	}
}

exports.create = function(options){ 
	var reporter = new Reporter(options);
	return reporter;
};