interface IListener {
  [key: string]: Function[]
}
export class Emitter {
  listeners: IListener
  constructor() {
    this.listeners = {}
  }

  emit(event:string, ...args: any[]) {

    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  subscribe(event:string, fn: Function) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== fn
      )
    }
  }
}
