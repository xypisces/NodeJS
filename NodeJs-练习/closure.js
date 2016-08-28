//闭包实现回调

function logCar(logMsg,callback) {
	// body...
	process.nextTick(function(){
		callback(logMsg);
	});
}

var cars = ["Ferrari","Porsche","Bugatti"];
for(var idx in cars){
	var message = "Saw a" + cars[idx];
	logCar(message,function(){
		console.log("Normal Callback:" + message);
	});
}
for ( var idx in cars){
	var message = "Saw a"+cars[idx];
	(function(msg){
		logCar(msg,function(){
			console.log("Closure Callback:" + msg);
		});
	})(message);
}