var http = require('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348'

function fileterData(html){
	var $ = cheerio.load(html)
	var cheapters = $('.chapter')

	var courseData = []

	cheapters.each(function(item){
		var cheapter = $(this)
		var cheapterTitle = cheapter.find('strong').text()
		var videos = cheapter.find('.video').children('li')
		var cheapterData = {
			cheapterTitle: cheapterTitle,
			videos:[]
		}

		videos.each(function(item){
			var video = $(this).find('.studyvideo')
			var videoTitle = video.text()
			var id = video.attr('href').split('video/')[1]
			cheapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})

		courseData.push(cheapterData)

	})
	return courseData
}


function printData(courseData){
	courseData.forEach(function(item){
		var cheapterTitle = item.cheapterTitle
		console.log(cheapterTitle + '\n')

		item.videos.forEach(function(video){
			console.log('{'+video.id+'}' + video.title + '\n')
		})
	})
}

http.get(url,function(res){
	var html = ''

	res.on('data',function(data){
		html+= data
	})

	res.on('end',function(){
		var courseData = fileterData(html)
		printData(courseData)
	})
}).on('error',function(){
	console.log('出错了!')
})