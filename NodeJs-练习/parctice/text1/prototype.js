
//原型继承
var Person = {
	sayhi:function(){
		console.log("hi,i'm",this.name);
	}
};

function Student(name){
	this.name=name;
	this.school = 'pku';
}
Student.prototype = Person;

var student = new Student('Alice');

student.sayhi();