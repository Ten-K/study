/**
 * 输入一个数字M，转化进制数N
 * @param {number} M
 * @param {number} N
 * @returns string
 */
function solve(M, N) {
	let res = []
	while (M > N) {
		res.push(M % N)
		M = Math.floor(M / N)
	}
	res.push(M)
	return res.reverse().join('')
}

console.log(solve(7, 2)) // 111
