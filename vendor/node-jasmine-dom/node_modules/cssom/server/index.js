var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
//	console.dir(request);
//	request.setEncoding("utf8");

//	console.dir(request.headers);
	var start = Date.now();
	var path = request.headers["x-path"];


	request.on("data", function(data){
		console.log(fs.writeFileSync(path, data));
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end(path + ' saved!\n');
		var end = Date.now();
		console.log(end - start + "ms");
	});

}).listen(8124);