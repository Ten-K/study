// Promise/A+规定的三种状态
const PINDING = 'pinding'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
	constructor(fn) {
		this.state = PINDING // Promise状态
		this.value = undefined // 储存then回调return的值
		this.resolveCallbacks = [] // 成功队列，resolve时触发
		this.rejectCallbacks = [] // 失败队列，reject时触发

		/**
		 * Promise的执行顺序是new Promise -> then()收集回调 -> resolve/reject执行回调
		 * 这一顺序是建立在fn是异步任务的前提上的，如果fn是一个同步任务
		 * 那么顺序就会变成new Promise -> resolve/reject执行回调 -> then()收集回调，resolve的执行跑到then之前去了
		 * 为了兼容这种情况，我们给resolve/reject执行回调的操作包一个setTimeout，让它异步执行
		 */
		const _resolve = (value) => {
			const run = () => {
				if (this.state !== PINDING) return
				this.state = FULFILLED
				this.value = value
				this.resolveCallbacks.forEach((cb) => {
					cb(value)
				})
			}
			setTimeout(run)
		}
		const _reject = (value) => {
			const run = () => {
				if (this.state !== PINDING) return
				this.state = REJECTED
				this.value = value
				this.rejectCallbacks.forEach((cb) => {
					cb(value)
				})
			}
			setTimeout(run)
		}
		try {
			fn(_resolve, _reject)
		} catch (error) {
			_reject(error)
		}
	}

	then(resolveFn, rejectFn) {
		// 根据规范，如果then的参数不是function，则我们需要忽略它，让链式调用继续往下执行
		typeof resolveFn !== 'function' ? (resolveFn = (value) => value) : null
		typeof rejectFn !== 'function'
			? (rejectFn = (reason) => {
					throw new Error(
						reason instanceof Error ? reason.message : reason
					)
			  })
			: null
		return new Promise((resolve, reject) => {
			const fulfilledFn = (value) => {
				try {
					let x = resolveFn(value)
					x instanceof Promise ? x.then(resolve, reject) : resolve(x)
				} catch (error) {
					reject(error)
				}
			}

			const rejectedFn = (error) => {
				try {
					let x = rejectFn(error)
					x instanceof Promise ? x.then(resolve, reject) : resolve(x)
				} catch (error) {
					reject(error)
				}
			}

			if (this.state === FULFILLED) {
				fulfilledFn(this.value)
			}
			if (this.state === REJECTED) {
				rejectedFn(this.value)
			}
			// 当状态为pending时，把then回调push进resolve/reject执行队列，等待执行
			if (this.state === PINDING) {
				this.resolveCallbacks.push(fulfilledFn)
				this.rejectCallbacks.push(rejectedFn)
			}
		})
	}

	// catch方法其实就是执行一下then的第二个回调
	catch(rejectFn) {
		return this.then(undefined, rejectFn)
	}

	//finally方法
	finally(callback) {
		return this.then(
			(value) => Promise.resolve(callback()).then(() => value), // Promise.resolve执行回调，并在then中return结果传递给后面的Promise
			(reason) =>
				Promise.resolve(callback()).then(() => {
					throw reason
				}) // reject同理
		)
	}

	// 静态的resolve方法
	static resolve(value) {
		if (value instanceof Promise) return value // 根据规范，如果参数是Promise实例，直接return这个实例
		return new Promise((resolve) => resolve(value))
	}

	// 静态的reject方法
	static reject(reason) {
		return new Promise((resolve, reject) => reject(reason))
	}

	/**
	 * 静态的all方法
	 * 当所有Promise成功时，按顺序返回成功的结果数组；有一个Promise失败则返回第一个失败 promise 的结果
	 */
	static all(promises) {
		let res = []
		let count = 0
		return new Promise((resolve, reject) => {
			promises.forEach((promise, i) => {
				Promise.resolve(promise).then(
					(v) => {
						res[i] = v
						count++
						//所有promise执行后, resolve结果
						if (count === promises.length) {
							resolve(res)
						}
					},
					(err) => {
						//有一个Promise被reject时，Promise的状态变为reject
						reject(err)
					}
				)
			})
		})
	}

	/**
	 * 静态的race方法
	 * 返回第一个改变状态的Promise，不管成功还是失败
	 */
	static race(promises) {
		return new Promise((resolve, reject) => {
			promises.forEach((promise) => {
				Promise.resolve(promise).then(
					(v) => {
						resolve(v)
					},
					(err) => {
						reject(err)
					}
				)
			})
		})
	}

	/**
	 * 静态的allSettled
   * 返回Promise所有结果，不管成功还是失败
	 */
	static allSettled(promises) {
		let res = []
		let count = 0
		return new Promise((resolve, reject) => {
			promises.forEach((promise, i) => {
				const fn = () => {
					count++
					if (count === promises.length) {
						resolve(res)
					}
				}
				Promise.resolve(promise).then(
					(v) => {
						res[i] = v
						fn()
					},
					(err) => {
						res[i] = err
						fn()
					}
				)
			})
		})
	}
}

const p1 = new Promise((resolve, reject) => {
	resolve(1) //同步executor测试
})

p1.then((res) => {
	console.log(res)
	return 2 //链式调用测试
})
	.then() //值穿透测试
	.then((res) => {
		console.log(res)
		return new Promise((resolve, reject) => {
			resolve(3) //返回Promise测试
		})
	})
	.then((res) => {
		console.log(res)
		throw new Error('reject测试') //reject测试
	})
	.then(
		() => {},
		(err) => {
			console.log(err)
		}
	)
	.catch((err) => {
		// catch测试
		console.log(err)
	})
