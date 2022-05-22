function inset(child, person) {
	const prototype = Object.create(person.prototype)
	prototype.constructor = child
	child.prototype = prototype
}

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

inset(Child, Person)

const p1 = new Child('p1')
const p2 = new Child('p2')

p1.colors.push('green')
console.log(p1.colors) // [ 'red', 'green', 'yellow', 'green' ]
console.log(p2.colors) // [ 'red', 'green', 'yellow' ]

p1.eat() // p1在吃东西
