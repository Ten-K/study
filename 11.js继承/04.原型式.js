/**
 * 原型式继承
 *   缺点：
 *     1.所有实例都会继承原型上的属性
 *     2.无法实现复用（新实例属性都是后面添加的）
 */

const car = {
	name: 'car',
	color: ['red', 'orange', 'yellow']
}

function object(o) {
	function F() {}
	F.prototype = o
	return new F()
}

const car1 = object(car)
const car2 = object(car)

console.log(car1, car2) // {}, {}
console.log(car1.__proto__, car2.__proto__)  // car对象
