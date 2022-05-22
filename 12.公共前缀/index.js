// 相当于array.every
Array.prototype.myEvery = function (cb) {
	if (typeof cb !== 'function') {
		throw new Error('第一个参数应当是函数')
	}
	// 空数组返回true
	if (!this.length) return true
	for (let i = 0; i < this.length; i++) {
		//如果任一次回调函数的返回值为假，就返回false，every就此停止执行
		if (!cb(this[i], i, this)) {
			return false
		}
	}
	//若遍历执行之后，回调函数结果全为真，返回true
	return true
}

const longestCommonPrefix = function (arr) {
	if (!arr.length) return ''
	//判断数组是否为空
	let res = '' //记录公共前缀
	const frist = arr[0]
	for (let i = 0; i < frist.length; i++) {
		let temp = frist[i]
		//每个字符串是否都有相同的字符
		if (
			arr.myEvery((el) => {
				return el.charAt(i) == temp
			})
		) {
			res += temp //记录公共前缀
		} else break //如果返回false，就停止判断，说明不是前缀了
	}
	return res
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight'])) // 'fl'
