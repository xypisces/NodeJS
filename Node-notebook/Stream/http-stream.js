var http = require('http')
var fs = require('fs')
// var request = require('request')

http
	.createServer(function(req,res){
		//请求网络数据
		//request('http://....').pipe(res)
		
		//pipe
		//fs.createReadStream('Stream.png').pipe(res)

		fs.readFile('logo.png',function(err,data){
			if(err){
				res.end('file not exist')
			}
			else{
				res.writeHeader(200,{'Context-Type':'text/html'})
				res.end(data)
			}
		})
	})
	.listen(9090)