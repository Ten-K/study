const maxNumberAdd = (s1, s2) => {
	let res = ''
	let crray = 0 // 位数
	let i1 = s1.length - 1
	let i2 = s2.length - 1
	while (i1 >= 0 || i2 >= 0) {
		const x = i1 >= 0 ? s1[i1] - '0' : 0
		const y = i2 >= 0 ? s2[i2] - '0' : 0
		const sum = x + y + crray
		res += sum % 10
		crray = Math.floor(sum / 10)
		i1--
		i2--
	}
	if (crray) res += crray
	return res.split('').reverse().join('')
}

console.log(maxNumberAdd('199', '188')) // 387
