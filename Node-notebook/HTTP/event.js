var EventEmitter = require('events').EventEmitter

var life = new EventEmitter()

// life.on('message',function(words){
// 	console.log('i am' + words + 'hhhhh..')
// })

//life.setMaxListeners(11) 设置最大监听数量

function water(who){
	console.log('给 ' + who + ' 倒水')
}
life.on('message', water)

//life.removeListener('message',water)

//console.log(life.listeners().length)

life.emit('message',' XUYU ')