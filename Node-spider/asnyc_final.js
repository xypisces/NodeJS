/**
 * Created by xuyusolo on 2017/9/8.
 */
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');
var url = require('url');
var async = require('async');
//写入
var fs = require('fs')
var path = require('path')

var app = express();
var cnodeUrl = 'https://cnodejs.org/';

app.get('/', function (req, responce, next) {
  superagent.get(cnodeUrl)
      .end(function (err, res) {
        if(err){
          return next(err);
        }
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (id, ele) {
          var $ele = $(ele);
          var href = url.resolve(cnodeUrl, $ele.attr('href'));
          topicUrls.push(href);
        });


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
        async.mapLimit(topicUrls,5, function (url, callback) {
          fetchUrl(url, callback);
        }, function (err, callback) {
          result = result.map(function(topicPair){
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
              title: $('.topic_full_title').text().trim(),
              href: topicUrl,
              comment1: $('.reply_content').eq(0).text().trim(),
            })
          })
          var data = JSON.stringify(result);
          //数据写入
          fs.appendFile(__dirname+'/data.json',data,'utf8',function(err){
            if(err){
              console.log(err);
            }else{
              console.log("写入成功！")
            }
          });
          responce.send(result);
          // console.log(result)
          console.log('success');
        })
      })
})

app.listen(3000, function () {
  console.log('app is listening at port 3000');
})