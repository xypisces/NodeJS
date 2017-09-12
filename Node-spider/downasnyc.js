/**
 * Created by xuyusolo on 2017/9/11.
 */
/**
 * Created by xuyusolo on 2017/9/8.
 */
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var async = require('async');
//写入
var fs = require('fs')
var path = require('path')
var request = require('request');
var wget = require('wget');

// 下载图片函数
var downloadImage = function(src, dest, callback) {
  request.head(src, function(err, res, body) {
    if (src) {
      // request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
      //   callback(null, dest);
      // });
      wget.download(src, dest).on('end', function() {
        callback(null, dest);
      });
    }
  });
};

var cnodeUrl = 'http://pic.netbian.com/4kfengjing';


superagent.get(cnodeUrl)
    .end(function (err, res) {
      if(err){
        return console.log(err);
      }
      // var topicUrls = [];
      // var $ = cheerio.load(res.text);
      // $('#main .slist').each(function (id, ele) {
      //   var $ele = $(ele);
      //   var href = url.resolve(cnodeUrl, $ele.attr('href'));
      //   topicUrls.push(href);
      // });

      var Arrurls = [
          "http://pic.netbian.com/4kdongwu/index.html",
          "http://pic.netbian.com/4kdongwu/index_2.html",
          "http://pic.netbian.com/4kdongwu/index_3.html",
          "http://pic.netbian.com/4kdongwu/index_4.html",
          "http://pic.netbian.com/4kdongwu/index_5.html",
          "http://pic.netbian.com/4kdongwu/index_6.html",
          "http://pic.netbian.com/4kdongwu/index_7.html",
          "http://pic.netbian.com/4kdongwu/index_8.html",
          "http://pic.netbian.com/4kdongwu/index_9.html",
          "http://pic.netbian.com/4kdongwu/index_10.html",
      ]

      var Count = 0;
      var result = [];
      var fetchUrl = function (url, callback) {
        var delay = parseInt((Math.random() * 10000000) % 2000, 10);
        Count++;
        console.log('现在并发数是', Count, '正在抓取的是', url, '耗时毫秒', delay);
        superagent.get(url)
            .end(function (err, res) {
              result.push([url, res.text])
            })
        setTimeout(function () {
          Count--;
          callback(null, url + 'html content');
        }, delay);
      };
      //控制并发
      var Arrimgs = [];
      async.mapLimit(Arrurls, 5, function (url, callback) {
        fetchUrl(url, callback);
      }, function (err, callback) {
        result.map(function(topicPair){
          // var topicUrl = topicPair[0];
          var topicHtml = topicPair[1];
          var $ = cheerio.load(topicHtml);
          $('#main .slist ul li img').each(function (id, ele) {
            var $ele = $(ele);
            var href = url.resolve(cnodeUrl, $ele.attr('src'));
            Arrimgs.push(href);
          });
          return;
        })
        if(Arrimgs.length>0){
          Arrimgs.map(function (item,id) {
            var pathname = './dongwu/' + id + '.jpg';
            downloadImage(item, pathname, function (err, data) {
              if (err) {
                console.log(err)
              }
              if (data) {
                console.log("done: " + data);
              }
            })
          })
        }
        //数据写入
        // var data = JSON.stringify(result);
        // fs.appendFile(__dirname+'/data.json',data,'utf8',function(err){
        //   if(err){
        //     console.log(err);
        //   }else{
        //     console.log("写入成功！")
        //   }
        // });
        console.log('success');
      })
    })