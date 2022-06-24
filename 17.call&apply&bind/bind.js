// 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
Function.prototype.myBind = function (context = window) {
	let self = this
	let args = Array.prototype.slice.call(arguments, 1)
	let Fn =  function () {
		let bindArgs = Array.prototype.slice.call(arguments)
		return self.apply(
			this instanceof Fn ? this : context,// new 的情况下 this 改绑成 new 出来的对象实例
			args.concat(bindArgs)
		)
	}
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  Fn.prototype= self.prototype
  return Fn
}

let value = 2

let foo = {
	value: 1
}

function bar(name, age) {
	this.habit = 'shopping'
	console.log(this.value)
	console.log(name)
	console.log(age)
}

bar.prototype.friend = 'kevin'

let bindFoo = bar.myBind(foo, 'daisy')

let obj = new bindFoo('18')
// undefined
// daisy
// 18
console.log(obj.habit)
console.log(obj.friend)
// shopping
// kevin
