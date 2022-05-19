// on 订阅 emit发布

// 邮局
const e = {
  //存订阅者
  _callback: [],
  on(callback) {
    this._callback.push(callback)
  },
  emit(value) {
    this._callback.forEach(fn => {
      fn(value)
    })
  }
}

e.on((value)=>{
  console.log(`张三订阅了${value}`)
})

e.on((value)=>{
  console.log(`李四订阅了${value}`)
})

e.on((value)=>{
  console.log(`王五订阅了${value}`)
})

e.emit('中央日报')

// 定义事件中心类
class MyEvent {
  handlers = {} // 存放事件 map，发布者，存放订阅者
  
// 绑定事件
  $on(type, fn) {
    if (!Reflect.has(this.handlers, type)) { // 如果没有定义过该事件，初始化该订阅者列表
      this.handlers[type] = []
    }
    this.handlers[type].push(fn) // 存放订阅的消息
  }

// 触发事件
  $emit(type, ...params) {
    if (!Reflect.has(this.handlers, type)) { // 如果没有该事件，抛出错误
      throw new Error(`未注册该事件${type}`)
    }
    this.handlers[type].forEach((fn) => { // 循环事件列表，执行每一个事件，相当于向订阅者发送消息
      fn(...params)
    })
  }

// 取消订阅
  $remove(type, fn) {
    if (!Reflect.has(this.handlers, type)) {
      throw new Error(`无效事件${type}`)
    }
    if (!fn) { // 如果没有传入方法，表示需要将该该类型的所有消息取消订阅
      return Reflect.deleteProperty(this.handlers, type)
    } else {
      const inx = this.handlers[type].findIndex((handler) => handler === fn)
      if (inx === -1) { // 如果该事件不在事件列表中，则抛出错误
        throw new Error('无效事件')
      }
      this.handlers[type].splice(inx, 1) // 从事件列表中删除该事件
      if (!this.handlers[type].length) { // 如果该类事件列表中没有事件了，则删除该类事件
        return Reflect.deleteProperty(this.handlers, type)
      }
    }
  }
}

const test = new MyEvent()
test.$on('myClick', (v) => {
  console.log(`myClick:${v}`)
})

test.$emit('myClick', 123)