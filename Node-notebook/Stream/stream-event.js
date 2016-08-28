var fs = require('fs')

var readStream = fs.createReadStream('Stream.js')
var n = 0
readStream
	.on('data',function(chunk){
		n++
		console.log('data emits')
		console.log(Buffer.isBuffer(chunk))
		// console.log(chunk.toString('utf8'))
		//<-- 当读写数据不一致时,文件过大,会导致buffer缓存在内存中,撑爆内存,导致内存泄漏  -->
		readStream.pause()
		console.log('data pause')
		setTimeout(function(){
			console.log('data pause end')
			readStream.resume()
		},3000)
		//<--   -->
	})
	.on('readable',function(){
		console.log('data readable')
	})
	.on('end',function(){
		console.log(n)
		console.log('data ends')
	})
	.on('close',function(){
		console.log('data close')
	})
	.on('error',function(){
		console.log('data read error' + e)
	})

