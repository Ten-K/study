const data = [
	{ id: 1, pid: 0 },
	{ id: 2, pid: 1 },
	{ id: 3, pid: 1 },
	{ id: 4, pid: 2 },
	{ id: 5, pid: 2 },
	{ id: 6, pid: 3 }
]

/** 第一种:hash表 + 引用关系 */
function getTree1(data) {
	let result = ''
	let map = {}
	data.forEach((item) => {
		map[item.id] = item
	})
	data.forEach((item) => {
		const parent = map[item.pid]
		if (parent) {
			;(parent.children || (parent.children = [])).push(item)
		} else {
			result = item
		}
	})
	return result
}

console.log('第一种:', JSON.stringify(getTree1(data)))

/** 第二种: 递归 */
function getTree2(data) {
	// 获取根节点
	const root = data.find(({ pid }) => pid === 0)
	if (!root) throw new Error('根节点不存在')
	// 从根节点开始构建树形结构
	return createNode(root, data)
}

function createNode(cur, data) {
	const { id, pid } = cur
	// 获取id下的所有子节点
	const childData = data.filter(({ pid }) => pid === id)
	// 重写节点
	const node = {
		id,
		pid,
		children: childData.reduce((ace, cur) => {
			ace.push(createNode(cur, data))
			return ace
		}, [])
	}
	return node
}

console.log('第二种:', JSON.stringify(getTree2(data)))
