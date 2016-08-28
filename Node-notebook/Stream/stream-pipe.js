var fs = require('fs')
var readStreamam = fs.createReadStream('Stream.png')
var writeStreamam = fs.createWriteStream('Stream-double.png')

readStreamam.on('data',function(chunk){
	writeStreamam.write(chunk)
})
readStreamam.on('end',function(){
	writeStreamam.end()
})

//<-- 当读写数据不一致时,文件过大,会导致buffer缓存在内存中,撑爆内存,导致内存泄漏  -->

//<----使用pipe-->
var fs = require('fs')
var readStreamam = fs.createReadStream('Stream.png')
var writeStreamam = fs.createWriteStream('Stream-double1.png')

readStreamam.pipe(writeStreamam)

//<------使用判断---->

var fs = require('fs')
var readStreamam = fs.createReadStream('Stream.png')
var writeStreamam = fs.createWriteStream('Stream2.png')

readStreamam.on('data',function(chunk){
	if(writeStreamam.write(chunk) === false){
		readStreamam.pause()
	}
})
readStreamam.on('end',function(){
	writeStreamam.end()
})
writeStreamam.on('drain',function(){
	readStreamam.resume()
})
