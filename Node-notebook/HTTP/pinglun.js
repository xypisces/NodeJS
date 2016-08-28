var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
	'content':'VUEVUEVUEVUE',
	'cid':12303
})

var options = {
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method: 'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Cache-Control':'no-cache',
		'Connection':'keep-alive',
		'Content-Length':'postData.length',
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=2b28cf77-5c1d-48a2-bef7-6f48856cccc8; imooc_isnew_ct=1470711132; loginstate=1; apsid=JhZTBiOGJhNjhkZjg4Y2VkYzgyYjI1OTE5MjRmMzcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjIzNzQ4NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5NTM5NDU1ODJAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGM0NGQzZTBkNzMyMDVjNmNlZTgyMTA0ZDY4NTg2NGU4EG6yVxBuslc%3DYz; last_login_username=953945582%40qq.com; PHPSESSID=tm8qn8h4j9h2ukrduruhqj7017; jwplayer.qualityLabel=è¶æ¸; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1471575261,1471829188,1471848806,1471921381; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1471944346; imooc_isnew=2; cvde=57bbbd96b8af8-94',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Pragma':'no-cache',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}


var req = http.request(options,function(res){
	console.log('Status:'+res.statusCode)
	console.log('headers:' + JSON.stringify(res.headers))

	res.on('data',function(chunk){
		console.log(typeof chunk)
	})

	res.on('end',function(){
		console.log('评论完毕!!')
	})

	req.on('error',function(e){
		console.log('error:' + e.message)
	})
})

req.write(postData)
req.end()