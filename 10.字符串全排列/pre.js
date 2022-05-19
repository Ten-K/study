const pre = (s) => {
	const res = []
	s = s
		.split('')
		.sort((a, b) => a - b)
		.join('')
	const dfs = (cur, store) => {
		if (!store.length) return res.push(cur)
		for (let i = 0; i < store.length; i++) {
			if (i > 0 && store[i] === store[i - 1]) continue
      // console.log(cur + store[i], store.slice(0, i) + store.slice(i + 1))
			dfs(cur + store[i], store.slice(0, i) + store.slice(i + 1))
		}
	}
	dfs('', s)
	return res
}

const s = 'abc'
console.log(pre(s)) // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
