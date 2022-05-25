const URLS = [
	'vue.com',
	'vite.com',
	'baidu.com',
	'github.com',
	'juejing.com',
	'bokeyuan.com'
]

// 模拟异步请求函数
let n = 0
const requestFn = (url) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(`任务${url}完成`)
		}, 1000 * n++)
	}).then((res) => {
		console.log('外部逻辑', res)
	})
}

class maxRequestSize {
	constructor(max, fn) {
		this.max = max // 最大并发数
		this.fn = fn // 自定义请求函数
		this.pool = [] // 并发池
		this.urls = [] // 剩余请求地址
	}

	start(urls) {
		this.urls = urls
		// 循环把并发池塞满
		while (this.pool.length < this.max) {
			const url = this.urls.shift()
			this.setTask(url)
		}
		// 利用Promise.race获取并发池中某个任务完成的信号
		const race = Promise.race(this.pool)
		this.run(race)
	}

	// 创建任务队列
	setTask(url) {
		if (!url) return
		const task = this.fn(url)
		this.pool.push(task) // 将任务推入pool并发池
		console.log(`${url}开始,当前任务数${this.pool.length}`)
		task.then((res) => {
			// 请求结束将该promise任务从任务池中删除
			this.pool.splice(this.pool.indexOf(task), 1)
			console.log(`${url}结束,当前任务数${this.pool.length}`)
		})
	}

	run(race) {
		race.then((res) => {
			// 每当并发吃完成一个任务就再推入一个任务进并发池
			const url = this.urls.shift()
			this.setTask(url)
			this.run(Promise.race(this.pool))
		})
	}
}

const pool = new maxRequestSize(3, requestFn)

pool.start(URLS)
