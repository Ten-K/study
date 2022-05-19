const _new = function () {
	// 创建新对象
	const newObj = {}
	// 获取构造函数
	const constructor = [].shift.call(arguments)
	// 新对象继承构造函数的原型
	newObj.__proto__ = constructor.prototype
	// 绑定this并执行构造函数
	const res = constructor.call(newObj, ...arguments)
	// 返回对象
	return typeof res === 'object' ? res : newObj
}

function Person(a) {
	this.a = a
	this.b = 2
}

const p = _new(Person, 1)
console.log(p instanceof Person)
