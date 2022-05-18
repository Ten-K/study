const isObject = (target) => {
	return typeof target === 'object' && target !== null
}

// 判断引用类型的temp
function checkTemp(target) {
	const c = target.constructor
	return new c()
}

const cloneDeep = (obj, map = new WeakMap()) => {
	if (!isObject(obj)) return obj
	if (obj instanceof Date) return new Date(obj)
	if (obj instanceof RegExp) return new RegExp(obj)
	if (map.has(obj)) return map.get(obj)

	let cloneObj = checkTemp(obj)
	map.set(obj, cloneObj)

	// 处理Map类型
	if (obj instanceof Map) {
		obj.forEach((value, key) => {
			cloneObj.set(key, cloneDeep(value, map))
		})

		return cloneObj
	}

	// 处理Set类型
	if (obj instanceof Set) {
		obj.forEach((value) => {
			cloneObj.add(cloneDeep(value, map))
		})

		return cloneObj
	}

	Reflect.ownKeys(obj).forEach((key) => {
		const item = obj[key]
		cloneObj[key] = isObject(item) ? cloneDeep(item, map) : item
	})

	return cloneObj
}

let obj1 = {
	name: 'xiaoming',
	age: 23,
	hobbies: { sports: 'swim', game: 'lol' },
	works: ['2020', '2021'],
	map: new Map([
		['aaa', 0001],
		['bbb', 0002]
	]),
	set: new Set([1, 2, 3]),
	func() {},
	sym: Symbol(1111),
	reg: new RegExp(/oooooooooo/g)
}

obj1.key = obj1 // 环引用

let obj2 = cloneDeep(obj1)
obj2.age = 11
// console.log(obj1)
// console.log(obj2)
// console.log(obj1 === obj2)
