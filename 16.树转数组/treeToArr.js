// const tree = {
// 	id: 1,
// 	pid: 0,
// 	children: [
// 		{
// 			id: 2,
// 			pid: 1,
// 			children: [
// 				{ id: 4, pid: 2 },
// 				{ id: 5, pid: 2 }
// 			]
// 		},
// 		{ id: 3, pid: 1, children: [{ id: 6, pid: 3 }] }
// 	]
// }

// function getArr(tree) {
// 	const result = []
// 	const loop = (data) => {
// 		const { id, pid, children } = data
// 		result.push({
// 			id,
// 			pid
// 		})
// 		if (children) {
// 			for (let i = 0; i < children.length; i++) {
// 				loop(children[i])
// 			}
// 		}
// 	}
// 	loop(tree)
// 	return result
// }

// console.log(getArr(tree))

const tree = {
	id: 1,
	children: [
		{
			id: 2,
			children: [{ id: 4 }, { id: 5 }]
		},
		{ id: 3, children: [{ id: 6 }] }
	]
}

function getArr(tree) {
	const result = []
	const loop = (data, pid = 0) => {
		const { id, children } = data
		result.push({
			id,
			pid
		})
		if (children) {
			for (let i = 0; i < children.length; i++) {
				loop(children[i], id)
			}
		}
	}
	loop(tree)
	return result
}

console.log(getArr(tree))
