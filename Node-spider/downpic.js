/**
 * Created by xuyusolo on 2017/9/8.
 */
var fs = require("fs");
var path = require('path');
var request = require('request');

var downloadImage = function(src, dest, callback) {
  request.head(src, function(err, res, body) {
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    if (src) {
      request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
        callback(null, dest);
      });
    }
  });
};

downloadImage("https://cdn.pixabay.com/photo/2017/09/05/21/42/love-2719254__340.jpg", "./img/1.png", function(err, data){
  if (err) {
    console.log(err)
  }
  if (data) {
    console.log("done: " + data);
  }
})