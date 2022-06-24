Function.prototype.myApply = function (thisArg = window, args = []) {
	// 将函数作为属性添加到thisArg上
	thisArg.fn = this
	// 执行thisArg.fn并存储返回值
	const res = thisArg.fn(...args)
	// 删除该方法避免对传入的对象造成污染
	delete thisArg.fn
	// 返回函数执行的返回值
	return res
}

let tenk = {
	name: 'tenk',
	fn() {
		console.log('tenk-name:', 'tenk')
	}
}

let xbl = {
	name: 'xbl',
	fn(...arg) {
		console.log('arg', ...arg)
		console.log('xbl-name:', this.name)
	}
}

console.log(xbl.fn.myApply(tenk, [1, 2, 3]))
