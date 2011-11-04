var http = require('http');
var staticServe = require('node-static');
var fs = require('fs');

function Server(port){
	this._html = '<html><body>Nothing has happened yet. But stay tuned!</body></html>';
	this._simpleHtml = fs.readFileSync(__dirname+'/resources/simple.html');
	this._json = {};
	this.port = port;

	var staticServer = new staticServe.Server(__dirname+'/resources');

	var that = this;
	this._httpServer = http.createServer(function (request, response) {
		that.processRequest(request.url,request.headers['content-type'],response);

		// static file fallback
		request.addListener('end', function(){
			staticServer.serve(request,response);
		});
	});
};

Server.prototype.updateJson = function(json){
	this._json = json;
}

Server.prototype.updateHtml = function(html){
	this._jasmineHtml = html;
}

Server.prototype.processRequest = function(url,mime,response){

	switch(url){
		case '/':
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(this._simpleHtml);
			break;
		case '/jasmine':
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(this._jasmineHtml);
			break;
		case '/json':
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end( JSON.stringify(this._json) );
			break;
		default:
			break;
	}
};

Server.prototype.start = function(){
	this._httpServer.listen(this.port, "127.0.0.1");

	console.log("Started http server on port ", this.port);
};

var server;
exports.start = function(port, callback){
	server = new Server(port);
	server.start(function(){
		callback();
	});
};
exports.stop = function(callback){
	if(server) server.stop();
};
exports.updateJson = function(json){
	if(server) server.updateJson(json);
};
exports.updateHtml = function(html){
	if(server) server.updateHtml(html);
};