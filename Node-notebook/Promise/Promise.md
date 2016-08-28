### Promise

三种状态
- pending 未完成
- fulfilled 已完成
- rejected 失败

Promise then 方法
<code>
	promiseObj.then(onFulfilled,onRejected)

	onFulfilled = function(value){
		return promiseObj2
	}

	onRejected = function(err){}
</code>