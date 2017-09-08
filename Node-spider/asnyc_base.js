/**
 * Created by xuyusolo on 2017/9/8.
 */
var async = require('async');

var Count = 0;
var fetchUrl = function (url, callback) {
  var delay = parseInt((Math.random() * 10000000) % 2000, 10);
  Count++;
  console.log('现在并发数是', Count, '正在抓取的是', url, '耗时毫秒', delay);
  setTimeout(function () {
    Count--;
    callback(null, url + 'html content');
  }, delay);
};

var Urls = [];
for(var i=0; i<30; i++){
  Urls.push('http://data_' + i);
}

async.mapLimit(Urls,5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, callback) {
  console.log('final:')
  console.log('success');
})