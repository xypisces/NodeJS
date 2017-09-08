/**
 * Created by xuyusolo on 2017/9/8.
 */
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');
var url = require('url');

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

        var ep = new eventproxy();

        ep.after('topic_html', topicUrls.length, function (topics) {
          topics = topics.map(function(topicPair){
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
              title: $('.topic_full_title').text().trim(),
              href: topicUrl,
              comment1: $('.reply_content').eq(0).text().trim(),
            })
          })
          // console.log('final:')
          // console.log(topics);
          responce.send(topics);
        })

        topicUrls.forEach(function (topicUrl) {
          superagent.get(topicUrl)
              .end(function (err, res) {
                // console.log('fetch' + topicUrl + 'success');
                ep.emit('topic_html', [topicUrl, res.text]);
              })
        })
      })
})

app.listen(3000, function () {
  console.log('app is listening at port 3000');
})