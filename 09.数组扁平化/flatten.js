let obj = {
	a: 'a',
	b: [1, { c: true }, [3]],
	d: { e: undefined, f: 3 },
	g: null
}

/**
 * obj{
 *  a: 'a',
 *  'b[0]': 1,
 *  'b[1].c': true,
 *  'b[2][0]': 3,
 *  'd.f': 3
 * }
 */

const isObject = (obj) => {
	return typeof obj === 'object'
}

const flatten = (obj) => {
	const res = {}

	const _flatten = (obj, prev = null) => {
		if (Array.isArray(obj)) {
			obj.forEach((item, i) => {
				if (isObject(item)) {
					if (item !== null) {
						_flatten(item, `${prev ? prev : ''}[${i}]`)
					}
				} else {
					res[`${prev ? prev : ''}[${i}]`] = item
				}
			})
			return
		}
		Object.keys(obj).forEach((key) => {
			const item = obj[key]
			if (isObject(item)) {
				if (item !== null) {
					_flatten(item, `${prev ? prev + '.' + key : key}`)
				}
			} else {
				if (item !== undefined) {
					res[`${prev ? prev + '.' + key : key}`] = item
				}
			}
		})
	}

	_flatten(obj)
	return res
}

console.log(flatten(obj))
