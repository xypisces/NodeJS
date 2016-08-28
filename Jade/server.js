var http = require('http')
var jade = require('jade')

http.createServer(function(req,res){
	res.writeHead(200,{
		'Content-Type':'text/html'
	})

	// var fn = jade.compile('div #{course}',{})
	// var html = fn({course:'jade'})
	// res.end(html)

	// var html = jade.render('div #{course}',{course:'jade render'})

	var html = jade.renderFile('index.jade',{course:'jade renderFile'})

	res.end(html)
}).listen(1337,'127.0.0.1')

console.log('Server SUCCESS!')