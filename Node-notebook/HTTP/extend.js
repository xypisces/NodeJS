function Cat(words){
	this.words = words
	this.speak = function(){
		console.log(this.words)
	}
}

function Dog(words){
	Cat.call(this,words)
	// Cat.apply(this,arguments)
}

var dog = new Dog('wang')

dog.speak()


