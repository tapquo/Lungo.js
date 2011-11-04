var cp = function(o){ if(typeof o != 'object') return o; var n = {}; for(var k in o) n[k] = o[k]; return n; };

function SimpleReporter(opt){
	console.debug('Creating SimpleReporter');

	var that = this;

	this.format = 'simple';
	this._report = {};

	this.results = [];
	this.currentSet = 0;

};

SimpleReporter.prototype.getReport = function(){
	return cp(this._report);
};

SimpleReporter.prototype.reportStartingGroup = function(name){
	this.results[this.currentSet] = this.results[this.currentSet] || {};
	this.results[this.currentSet].name = name;
}

SimpleReporter.prototype.reportSpecResults = function(spec){

	var items = spec.results().getItems();
	for (var i = 0; i < items.length; i++){
		if( ! items[i].passed_){
			this.results[this.currentSet] = this.results[this.currentSet] || {};
			this.results[this.currentSet].failures = this.results[this.currentSet].failures || [];

			var failureReport = items[i];
			failureReport.suite = spec.suite.description;
			failureReport.spec = spec.description;
			failureReport.group = this.results[this.currentSet].name;
			this.results[this.currentSet].failures.push(failureReport);
		}
	}
}

SimpleReporter.prototype.reportRunnerResults = function(runner){
	var results = runner.results();

	this.results[this.currentSet] = this.results[this.currentSet] || {};
	this.results[this.currentSet].passed = results.passedCount;
	this.results[this.currentSet].failed = results.failedCount;
	this.results[this.currentSet].total = results.totalCount;
	this.currentSet++;
}

SimpleReporter.prototype.updateReport = function(){
	var totalPassed = 0,
		totalFailed = 0,
		totalTests = 0,
		totalSuites = 0,
		failureDetails = [];

	for(var k in this.results){
		var result = this.results[k];
		totalPassed += result.passed;
		totalFailed += result.failed;
		totalTests += result.total;
		totalSuites++;
		if(result.failures){
			for(var j = 0; j < result.failures.length; j++){
				failureDetails.push(result.failures[j]);
			}
		}
	}

	this._report = {
		details: cp(this.results),
		passed: totalPassed,
		failed: totalFailed,
		total: totalTests,
		suites: totalSuites,
		failureDetails: cp(failureDetails),
		status: (totalFailed == 0) ? "Passed" : "Failed"
	};
};

SimpleReporter.prototype.reset = function(){
	this.results = [];
};



exports.create = function(opt){
	return new SimpleReporter(opt);
}