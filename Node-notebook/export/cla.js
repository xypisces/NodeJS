var stu = require('./stu')
var tea = require('./tea')

function addcla(teaName,stuName){
	tea.addtea(teaName)
	stuName.forEach(function(item,index){
		stu.addstu(item)
	})
} 


exports.addcla = addcla;