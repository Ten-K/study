/**
 * 构造函数继承
 * 缺点：
 *    1.多执行一次call
 *    2.Person上的原型不能被继承
 */
function Person(name) {
	this.name = name
	this.colors = ['red', 'green', 'yellow']
}

Person.prototype = {
	eat() {
		console.log(this.name + '在吃东西')
	}
}

function Child(name) {
  Person.call(this, name)
}

const p1 = new Child('p1')
const p2 = new Child('p2')

p1.colors.push('green')
console.log(p1.colors) // [ 'red', 'green', 'yellow', 'green' ]
console.log(p2.colors) // [ 'red', 'green', 'yellow' ]

// 缺点2
p1.eat() // p1.eat is not a function
