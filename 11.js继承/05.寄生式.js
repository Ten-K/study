/**
 * 寄生式继承
 *  缺点：
 *    1.没用到原型
 *    2.无法复用
 */

function createObject(o) {
	const clone = Object.create(o)
	clone.say = function () {
		console.log('hi')
	}
	return clone
}

const car = {
	name: 'car',
	color: ['red', 'orange', 'yellow']
}

const car1 = createObject(car)
console.log(car1)
console.log(car1.__proto__)
