function JunitXmlReporter(opt){
	console.debug('Creating JunitXmlReporter');

	var that = this;

	this.format = 'junit';
	this.report = '';

	this.xml = '';
	this.currentSetData = '';
	this.currentGroupName = '';

};

JunitXmlReporter.prototype.getReport = function(){
	return this.report;
};

JunitXmlReporter.prototype.reportSpecResults = function(spec){
	var s = function(s){
		return s.replace(/\s/gi, '_');
	};
	var e = function(s){
	    return s.replace(/\</gi, '&lt;').replace(/\>/gi, '&gt;').replace(/"/gi, "'");
	}
	
	var specName = s(this.currentGroupName) + "." + s(spec.suite.description) + "." + s(spec.description);
	
	var results = spec.results().getItems();
	for(var k in results){
		var result = results[k];
		var name = result.type + " " + result.matcherName + " " + (result.expected ? result.expected : "");
		name = e(name);
		specName = e(specName);
		if(result.passed()){
			this.xml += '<testcase classname="'+specName+'" name="'+name+'" time="'+result.time+'"/>';
		} else {
			this.xml += '<testcase classname="'+specName+'" name="'+name+'">';
			this.xml += 	'<failure><![CDATA[';
			this.xml += 		'FAILURE in spec "' + spec.description + '": ';
			this.xml += 		result.message + "\n\n\n\n" + result.trace.stack;
			this.xml += 	']]></failure>';
			this.xml += '</testcase>';
		}
	}
};

JunitXmlReporter.prototype.reportSuiteResults = function(suite){
	
};

JunitXmlReporter.prototype.reportRunnerResults = function(runner){
	
};

JunitXmlReporter.prototype.reportStartingGroup = function(name){
	this.currentGroupName = name;
};

JunitXmlReporter.prototype.updateReport = function(){
	this.report = "<testsuite>"+this.xml+"</testsuite>";
};

JunitXmlReporter.prototype.reset = function(){
	this.results = [];
};



exports.create = function(opt){
	return new JunitXmlReporter(opt);
}