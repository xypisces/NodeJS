
var http = require('http');
//创建服务器
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('hello,node!\n');
}).listen(1337,'127.0.0.1');
console.log('server running at http://127.0.0.1:1337');