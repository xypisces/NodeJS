var fs = require('fs')
var source = fs.readFileSync('../Buffer/logo.png')

fs.writeFileSync('Stream.png',source)