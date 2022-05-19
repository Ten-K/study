/**
 * 观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，
 * 所有依赖于它的对象都将得到通知，并自动更新。
 */
// Subject 主题
class Subject {
	constructor(name) {
		this.name = name
		this.state = '开心'
		this.observers = [] // 存放观察者
	}

	// 设置状态
	setState(state) {
		this.state = state
		this.notify()
	}

	// 新增观察者
	attch(ther) {
		this.observers.push(ther)
	}

  // 移除观察者
  remove(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }

	// 通知每个观察者
	notify() {
		this.observers.forEach((observer) => {
			observer.update(this)
		})
	}
}

// 观察者
class Observer {
	constructor(name) {
		this.name = name
	}

	update(subject) {
		console.log(`${this.name}: ${subject.name} ${subject.state}`)
	}
}

const baby = new Subject('宝宝')
const father = new Observer('爸爸')
const mather = new Observer('妈妈')
baby.attch(father)
baby.attch(mather)
baby.setState('不开心')
baby.remove(mather)
baby.setState('没有妈妈观察后开心了')
