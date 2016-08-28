var cat = {
	words: '...',
	speak: function(say){
		console.log(say + ' ' + this.words)
	}
}

// cat.speak('Speak')

var dog = {
	words: 'wang'
}

cat.speak.call(dog, 'Speak')












