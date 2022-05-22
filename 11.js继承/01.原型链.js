/**
 * 原型链继承
 * 缺点：
 *    1.父类引用类型的属性，会被所有实例共享
 *    2.创建子类实例时，不能像父类传参
 */
function Person() {
	this.name = 'John'
	this.colors = ['red', 'green', 'yellow']
}

Person.prototype = {
	eat() {
		console.log(this.name + '在吃东西')
	}
}

function Child() {}

Child.prototype = new Person()

// 缺点2
const p1 = new Child()
const p2 = new Child()

// 缺点1
p1.colors.push('green')
console.log(p1.colors) // [ 'red', 'green', 'yellow', 'green' ]
console.log(p2.colors) // [ 'red', 'green', 'yellow', 'green' ]
