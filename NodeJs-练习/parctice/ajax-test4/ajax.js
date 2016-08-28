

var http = require('http'),
	fs   = require('fs'),
	html = fs.readFileSync('./ajax.html','utf-8');

http.createServer(function(req,res){
	switch(req.url){
		case '/':
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(html);
			break;
		case '/date':
			var date = new Date();
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(date.toString());
			break;
	}
	res.end();
}).listen(1337,'127.0.0.1')
