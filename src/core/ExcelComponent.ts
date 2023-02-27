import { IData } from './../redux/actions'
import { IStore } from './createStore'
import { Emitter } from './Emitter'
import { Dom } from './dom'
import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  readonly name: string
  emitter: Emitter
  subscribe: string[]
  store: IStore
  unsubscribers: Function[]

  constructor($root: Dom, options: { [key: string]: any } = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {}

  $emit(event: string, ...args: any[]) {
    this.emitter.emit(event, ...args)
  }

  $on(event: string, fn: Function) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action: IData) {
    this.store.dispatch(action)
  }

  toHTML() {
    return ''
  }

  storeChanged(changes: any) {}

  isWatching(key: string) {
    return this.subscribe.includes(key)
  }

  init() {
    this.addDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
