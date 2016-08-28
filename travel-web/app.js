var express = require('express');
var app = express();

app.set('port',process.env.PORT||3000);

app.get('/',function(req,res){
	res.type('text/plain');
	res.send('Meadowlark Travle');
});

app.get('/about',function(req,res){
	res.type('text/plain');
	res.send('About Meadlark Travle');
});


app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('404 - Not Found');
});

app.listen(app.get('port'),function(){
	console.log('Express satrted on http://localhost:'+app.get('port')+';poress Crtl-C to terminate.');
})